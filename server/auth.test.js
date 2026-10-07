const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('./index');

const env = {
  NODE_ENV: 'test',
  FRONTEND_ORIGIN: 'https://abduaziz475.github.io',
  ESKIZ_EMAIL: 'test@example.com',
  ESKIZ_PASSWORD: 'test-password',
  DIRECTOR_CODE: 'ITTAT2025',
  JWT_SECRET: 'unit-test-secret-that-is-long-enough',
};
let server;
let baseUrl;
let currentTime = 1_800_000_000_000;
let smsCalls;

before(async () => {
  smsCalls = [];
  const app = createApp({
    env,
    now: () => currentTime,
    makeCode: () => '123456',
    fetchImpl: async (url, options) => {
      smsCalls.push({ url, options });
      if (url.endsWith('/auth/login')) {
        return Response.json({ data: { token: 'eskiz-test-token' } });
      }
      return new Response(null, { status: 200 });
    },
  });
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('sends an SMS code and accepts it only once', async () => {
  const sendResponse = await fetch(`${baseUrl}/api/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '+998 90 123 45 67' }),
  });
  assert.equal(sendResponse.status, 200);
  assert.equal(smsCalls.length, 2);
  assert.equal(smsCalls[1].url, 'https://notify.eskiz.uz/api/message/sms/send');
  assert.match(JSON.parse(smsCalls[1].options.body).message, /123456/);

  const verifyResponse = await fetch(`${baseUrl}/api/auth/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '998901234567', code: '123456' }),
  });
  const session = await verifyResponse.json();
  assert.equal(verifyResponse.status, 200);
  assert.equal(session.user.role, 'user');
  assert.equal(session.user.phone, '998901234567');

  const reuseResponse = await fetch(`${baseUrl}/api/auth/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '998901234567', code: '123456' }),
  });
  assert.equal(reuseResponse.status, 401);
});

test('throttles SMS resends to the same phone number', async () => {
  const firstResponse = await fetch(`${baseUrl}/api/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '998911112233' }),
  });
  assert.equal(firstResponse.status, 200);
  const callCount = smsCalls.length;

  const resendResponse = await fetch(`${baseUrl}/api/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '998911112233' }),
  });
  assert.equal(resendResponse.status, 429);
  assert.equal(smsCalls.length, callCount);
});

test('issues a director session only for the configured code', async () => {
  const rejected = await fetch(`${baseUrl}/api/auth/director`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'wrong-code' }),
  });
  assert.equal(rejected.status, 401);

  const accepted = await fetch(`${baseUrl}/api/auth/director`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'ITTAT2025' }),
  });
  const session = await accepted.json();
  assert.equal(accepted.status, 200);
  assert.equal(session.user.role, 'director');

  const verify = await fetch(`${baseUrl}/api/auth/verify`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  assert.deepEqual((await verify.json()).user, { role: 'director' });
});

test('rejects phone numbers that are not valid Uzbekistan numbers', async () => {
  const response = await fetch(`${baseUrl}/api/auth/request-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '1234567' }),
  });
  assert.equal(response.status, 400);
});
