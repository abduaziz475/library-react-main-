import { useEffect, useState } from 'react';
import './App.css';

const DEMO_CODE_KEY = 'ittat-demo-login';
const REMEMBERED_SESSION_KEY = 'ittat-remembered-session';
const DIRECTOR_CODE = 'ITTAT2025';

function getNationalPhoneDigits(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.startsWith('998') && digits.length > 9 ? digits.slice(3, 12) : digits.slice(0, 9);
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [session, setSession] = useState(() => readStorage(REMEMBERED_SESSION_KEY, null));

  useEffect(() => {
    if (session?.remember) {
      localStorage.setItem(REMEMBERED_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(REMEMBERED_SESSION_KEY);
    }
  }, [session]);

  const handleLogin = (nextSession) => {
    if (nextSession.remember) {
      localStorage.setItem(REMEMBERED_SESSION_KEY, JSON.stringify(nextSession));
    } else {
      localStorage.removeItem(REMEMBERED_SESSION_KEY);
    }
    setSession(nextSession);
  };

  const handleBack = () => {
    localStorage.removeItem(REMEMBERED_SESSION_KEY);
    localStorage.removeItem(DEMO_CODE_KEY);
    setSession(null);
  };

  if (session) {
    return <WelcomeScreen user={session} onBack={handleBack} />;
  }

  return <LoginScreen onLogin={handleLogin} />;
}

function LoginScreen({ onLogin }) {
  const saved = readStorage(DEMO_CODE_KEY, {});
  const [mode, setMode] = useState(saved.mode || 'user');
  const [step, setStep] = useState(saved.step || 'phone');
  const [phone, setPhone] = useState(() => getNationalPhoneDigits(saved.phone));
  const [generatedCode, setGeneratedCode] = useState(saved.generatedCode || '');
  const [code, setCode] = useState(saved.code || '');
  const [repeatCode, setRepeatCode] = useState(saved.repeatCode || '');
  const [directorCode, setDirectorCode] = useState(saved.directorCode || '');
  const [directorCodeRepeat, setDirectorCodeRepeat] = useState(saved.directorCodeRepeat || '');
  const [remember, setRemember] = useState(Boolean(saved.remember));
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(DEMO_CODE_KEY, JSON.stringify({
      mode,
      step,
      phone,
      generatedCode,
      code,
      repeatCode,
      directorCode,
      directorCodeRepeat,
      remember,
    }));
  }, [mode, step, phone, generatedCode, code, repeatCode, directorCode, directorCodeRepeat, remember]);

  const createDemoCode = (event) => {
    event.preventDefault();
    if (!/^\d{9}$/.test(phone)) {
      setError('Telefon raqamini +998 dan keyin 9 ta raqam qilib kiriting.');
      return;
    }
    const nextCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedCode(nextCode);
    setCode(nextCode);
    setRepeatCode('');
    setStep('code');
    setError('');
  };

  const verifyUser = (event) => {
    event.preventDefault();
    if (code !== generatedCode) {
      setError('Tasdiqlash kodi noto‘g‘ri');
      return;
    }
    if (repeatCode !== code) {
      setError('Kodlar bir xil emas');
      return;
    }
    onLogin({ role: 'user', phone: `+998${phone}`, remember });
  };

  const verifyDirector = (event) => {
    event.preventDefault();
    if (directorCode !== directorCodeRepeat) {
      setError('Kodlar bir xil emas');
      return;
    }
    if (directorCode !== DIRECTOR_CODE) {
      setError('Direktor kodi noto‘g‘ri');
      return;
    }
    onLogin({ role: 'director', remember });
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  return (
    <main className="auth-page">
      <div className="login-shell">
        <header className="brand-row" aria-label="IT TAT logotipi">
          <img
            className="brand-logo"
            src={`${process.env.PUBLIC_URL}/ittat-logo.png`}
            alt="IT TAT O‘quv markazi"
          />
        </header>

        <section className="login-card">
          <h1>Xush kelibsiz</h1>
          <p className="login-intro">Platformaga kirish uchun ma’lumotlaringizni kiriting.</p>

          <div className="auth-tabs" role="tablist" aria-label="Kirish turi">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'user'}
              className={mode === 'user' ? 'selected' : ''}
              onClick={() => changeMode('user')}
            >
              Foydalanuvchi
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'director'}
              className={mode === 'director' ? 'selected' : ''}
              onClick={() => changeMode('director')}
            >
              Direktor / Admin
            </button>
          </div>

          {mode === 'user' && (
            <form onSubmit={step === 'phone' ? createDemoCode : verifyUser} className="login-form">
              {step === 'phone' ? (
                <label>
                  <span>Telefon raqami</span>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                      <path d="M10 18h4" />
                    </svg>
                    <span className="phone-prefix" aria-hidden="true">+998</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value.replace(/\D/g, '').slice(0, 9));
                        setError('');
                      }}
                      placeholder="90 123 45 67"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength="9"
                      aria-label="Telefon raqami, +998 dan keyin"
                      aria-required="true"
                    />
                  </div>
                </label>
              ) : (
                <>
                  <p className="code-hint">
                    Demo tasdiqlash kodi: <strong className="demo-code">{generatedCode}</strong>
                    <span className="demo-note">SMS yuborilmaydi — bu kod faqat demo uchun.</span>
                  </p>
                  <label>
                    <span>Tasdiqlash kodi</span>
                    <div className="input-wrap">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="3" />
                        <path d="M7 10h.01M12 10h.01M17 10h.01M8 15h8" />
                      </svg>
                      <input
                        type="text"
                        value={code}
                        onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="6 xonali kod"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength="6"
                        required
                      />
                    </div>
                  </label>
                  <label>
                    <span>Kodni qayta kiriting</span>
                    <div className="input-wrap">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="3" />
                        <path d="m8 12 2.5 2.5L16 9" />
                      </svg>
                      <input
                        type="text"
                        value={repeatCode}
                        onChange={(event) => setRepeatCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Kodni takroran kiriting"
                        inputMode="numeric"
                        maxLength="6"
                        required
                      />
                    </div>
                  </label>
                  <button type="button" className="text-btn back-link" onClick={() => { setStep('phone'); setError(''); }}>
                    ← Orqaga
                  </button>
                </>
              )}

              <label className="remember-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Meni eslab qol</span>
              </label>

              {error && <p className="error-text" role="alert">{error}</p>}

              <button type="submit" className="primary-btn wide-btn">
                <span>{step === 'phone' ? 'Kirish' : 'Kirish'}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
          )}

          {mode === 'director' && (
            <form onSubmit={verifyDirector} className="login-form">
              <label>
                <span>Direktor kodi</span>
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                  </svg>
                  <input
                    type="password"
                    value={directorCode}
                    onChange={(event) => setDirectorCode(event.target.value)}
                    placeholder="Direktor kodini kiriting"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </label>
              <label>
                <span>Kodni qayta kiriting</span>
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                  </svg>
                  <input
                    type="password"
                    value={directorCodeRepeat}
                    onChange={(event) => setDirectorCodeRepeat(event.target.value)}
                    placeholder="Direktor kodini takroran kiriting"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </label>
              <label className="remember-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Meni eslab qol</span>
              </label>
              {error && <p className="error-text" role="alert">{error}</p>}
              <button type="submit" className="primary-btn wide-btn">
                <span>Direktor sifatida kirish</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
              <button type="button" className="text-btn back-link" onClick={() => changeMode('user')}>
                ← Orqaga
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function WelcomeScreen({ user, onBack }) {
  return (
    <main className="auth-page welcome-page">
      <section className="welcome-card">
        <img
          className="brand-logo"
          src={`${process.env.PUBLIC_URL}/ittat-logo.png`}
          alt="IT TAT O‘quv markazi"
        />
        <p className="welcome-eyebrow">{user.role === 'director' ? 'Direktor / Admin' : 'Foydalanuvchi'}</p>
        <h1>Xush kelibsiz!</h1>
        <p>IT TAT platformasiga muvaffaqiyatli kirdingiz.</p>
        <button type="button" className="text-btn welcome-back" onClick={onBack}>
          ← Orqaga
        </button>
      </section>
    </main>
  );
}

export default App;
