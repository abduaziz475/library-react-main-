const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit').rateLimit;
const jwt = require('jsonwebtoken');

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_DELAY_MS = 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return /^998\d{9}$/.test(digits) ? digits : null;
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createApp({
  env = process.env,
  fetchImpl = fetch,
  now = Date.now,
  makeCode = () => String(crypto.randomInt(100000, 1000000)),
} = {}) {
  const app = express();
  const codes = new Map();
  const lastSentAt = new Map();
  const allowedOrigins = (env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const apiBase = (env.ESKIZ_API_URL || 'https://notify.eskiz.uz/api').replace(/\/$/, '');

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      const localDevelopment = env.NODE_ENV !== 'production' &&
        /^http:\/\/localhost:\d+$/.test(origin || '');
      callback(null, !origin || allowedOrigins.includes(origin) || localDevelopment);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(express.json({ limit: '10kb' }));

  const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler(_request, response) {
      response.status(429).json({ error: 'Juda ko\'p urinish. Keyinroq qayta urinib ko\'ring.' });
    },
  });
  const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler(_request, response) {
      response.status(429).json({ error: 'Juda ko\'p urinish. Keyinroq qayta urinib ko\'ring.' });
    },
  });

  function issueToken(user) {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: '8h' });
  }

  async function sendSms(phone, code) {
    const loginResponse = await fetchImpl(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: env.ESKIZ_EMAIL,
        password: env.ESKIZ_PASSWORD,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!loginResponse.ok) {
      throw new Error('SMS provider authentication failed');
    }

    const loginResult = await loginResponse.json();
    const accessToken = loginResult.data?.token || loginResult.token;
    if (!accessToken) {
      throw new Error('SMS provider did not return an access token');
    }

    const smsResponse = await fetchImpl(`${apiBase}/message/sms/send`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        mobile_phone: phone,
        message: `IT TAT tizimiga kirish kodingiz: ${code}. Kod 5 daqiqa amal qiladi.`,
        from: env.ESKIZ_FROM || '4546',
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!smsResponse.ok) {
      throw new Error('SMS provider rejected the message');
    }
  }

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.post('/api/auth/request-code', requestLimiter, async (request, response) => {
    const phone = normalizePhone(request.body?.phone);
    if (!phone) {
      return response.status(400).json({ error: 'O\'zbekiston telefon raqamini +998 bilan kiriting.' });
    }
    if (!env.ESKIZ_EMAIL || !env.ESKIZ_PASSWORD || !env.JWT_SECRET) {
      return response.status(503).json({ error: 'Kirish xizmati sozlanmagan.' });
    }

    for (const [storedPhone, record] of codes) {
      if (record.expiresAt <= now()) {
        codes.delete(storedPhone);
      }
    }
    for (const [storedPhone, sentAt] of lastSentAt) {
      if (now() - sentAt >= 15 * 60 * 1000) {
        lastSentAt.delete(storedPhone);
      }
    }

    const sentAt = lastSentAt.get(phone);
    const waitMs = sentAt ? RESEND_DELAY_MS - (now() - sentAt) : 0;
    if (waitMs > 0) {
      return response.status(429).json({
        error: `Yangi kodni ${Math.ceil(waitMs / 1000)} soniyadan keyin so'rang.`,
      });
    }

    const code = makeCode();
    try {
      await sendSms(phone, code);
    } catch (error) {
      console.error('Eskiz SMS delivery failed:', error.message);
      return response.status(502).json({ error: 'SMS yuborilmadi. Keyinroq qayta urinib ko\'ring.' });
    }

    codes.set(phone, { code, expiresAt: now() + OTP_TTL_MS, attempts: 0 });
    lastSentAt.set(phone, now());
    return response.json({ message: 'Tasdiqlash kodi SMS orqali yuborildi.' });
  });

  app.post('/api/auth/verify-code', verifyLimiter, (request, response) => {
    const phone = normalizePhone(request.body?.phone);
    const code = String(request.body?.code || '');
    if (!phone || !/^\d{6}$/.test(code)) {
      return response.status(400).json({ error: 'Telefon raqami yoki SMS kodi noto\'g\'ri.' });
    }
    if (!env.JWT_SECRET) {
      return response.status(503).json({ error: 'Kirish xizmati sozlanmagan.' });
    }

    const record = codes.get(phone);
    if (!record || record.expiresAt <= now() || record.attempts >= MAX_OTP_ATTEMPTS) {
      codes.delete(phone);
      return response.status(401).json({ error: 'Kod noto\'g\'ri yoki muddati tugagan.' });
    }
    if (!safeEqual(record.code, code)) {
      record.attempts += 1;
      if (record.attempts >= MAX_OTP_ATTEMPTS) {
        codes.delete(phone);
      }
      return response.status(401).json({ error: 'Kod noto\'g\'ri yoki muddati tugagan.' });
    }

    codes.delete(phone);
    const user = { role: 'user', phone };
    return response.json({ token: issueToken(user), user });
  });

  app.post('/api/auth/director', verifyLimiter, (request, response) => {
    if (!env.JWT_SECRET || !env.DIRECTOR_CODE) {
      return response.status(503).json({ error: 'Direktor kirishi sozlanmagan.' });
    }
    if (!safeEqual(request.body?.code || '', env.DIRECTOR_CODE)) {
      return response.status(401).json({ error: 'Direktor kodi noto\'g\'ri.' });
    }

    const user = { role: 'director' };
    return response.json({ token: issueToken(user), user });
  });

  app.get('/api/auth/verify', (request, response) => {
    const match = /^Bearer (.+)$/.exec(request.get('authorization') || '');
    if (!match || !env.JWT_SECRET) {
      return response.status(401).json({ error: 'Kirish muddati tugagan.' });
    }
    try {
      const { role, phone } = jwt.verify(match[1], env.JWT_SECRET);
      if (role === 'user' && typeof phone === 'string') {
        return response.json({ user: { role, phone } });
      }
      if (role === 'director') {
        return response.json({ user: { role } });
      }
      return response.status(401).json({ error: 'Kirish muddati tugagan.' });
    } catch {
      return response.status(401).json({ error: 'Kirish muddati tugagan.' });
    }
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = Number(process.env.PORT) || 10000;
  app.listen(port, () => {
    console.log(`IT TAT auth API listening on port ${port}`);
  });
}

module.exports = { createApp, normalizePhone };
