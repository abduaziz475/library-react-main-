import { useEffect, useState } from 'react';
import './App.css';

const authApiUrl = process.env.REACT_APP_AUTH_API_URL || '';

function App() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ittat-session'));
    } catch {
      return null;
    }
  });
  const [checkingSession, setCheckingSession] = useState(Boolean(session));
  const sessionToken = session?.token;

  useEffect(() => {
    if (!sessionToken) {
      localStorage.removeItem('ittat-session');
      setCheckingSession(false);
      return;
    }

    let active = true;
    fetch(`${authApiUrl}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${sessionToken}` },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Session expired');
        }
        const result = await response.json();
        if (active) {
          setSession((currentSession) => currentSession?.token === sessionToken
            ? { ...currentSession, user: result.user }
            : currentSession);
        }
      })
      .catch(() => {
        if (active) {
          setSession(null);
        }
      })
      .finally(() => {
        if (active) {
          setCheckingSession(false);
        }
      });

    return () => {
      active = false;
    };
  }, [sessionToken]);

  useEffect(() => {
    if (session) {
      localStorage.setItem('ittat-session', JSON.stringify(session));
    } else {
      localStorage.removeItem('ittat-session');
    }
  }, [session]);

  if (checkingSession) {
    return <main className="auth-page" aria-label="Tekshirilmoqda" />;
  }

  if (!session) {
    return <LoginScreen onLogin={setSession} />;
  }

  return <BlankWorkspace user={session.user} onLogout={() => setSession(null)} />;
}

function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState('user');
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [directorCode, setDirectorCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (!resendIn) {
      return undefined;
    }
    const timer = window.setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  const requestCode = async (event) => {
    event.preventDefault();
    setError('');
    if (!authApiUrl) {
      setError('SMS kodi yuborilmadi: kirish serveri sozlanmagan. Telefon raqamingiz xato emas.');
      return;
    }
    setBusy(true);

    try {
      const response = await fetch(`${authApiUrl}/api/auth/request-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'SMS yuborilmadi.');
      }
      setStep('code');
      setResendIn(60);
    } catch (requestError) {
      setError(requestError.message || 'Server bilan bog\'lanib bo\'lmadi.');
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setError('');
    if (!authApiUrl) {
      setError('Kirish serveri sozlanmagan. Administrator server sozlamalarini tekshirishi kerak.');
      return;
    }
    setBusy(true);

    try {
      const response = await fetch(`${authApiUrl}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Kod noto\'g\'ri yoki muddati tugagan.');
      }
      onLogin(result);
    } catch (requestError) {
      setError(requestError.message || 'Server bilan bog\'lanib bo\'lmadi.');
    } finally {
      setBusy(false);
    }
  };

  const verifyDirector = async (event) => {
    event.preventDefault();
    setError('');
    if (!authApiUrl) {
      setError('Kirish serveri sozlanmagan. Administrator server sozlamalarini tekshirishi kerak.');
      return;
    }
    setBusy(true);

    try {
      const response = await fetch(`${authApiUrl}/api/auth/director`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: directorCode }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Direktor kodi noto\'g\'ri.');
      }
      onLogin(result);
    } catch (requestError) {
      setError(requestError.message || 'Server bilan bog\'lanib bo\'lmadi.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="login-shell">
        <header className="brand-row" aria-label="IT TAT o'quv markazi">
          <img className="brand-logo" src={`${process.env.PUBLIC_URL}/ittat-logo.png`} alt="IT TAT o'quv markazi logotipi" />
        </header>

        <section className="login-card">
          <h1>Xush kelibsiz</h1>
          <p className="login-intro">Platformaga kirish uchun ma'lumotlaringizni kiriting.</p>
          {!authApiUrl && (
            <p className="service-notice" role="status">
              SMS xizmati hali ulanmagan. Telefon raqamingiz xato emas — kirish serveri va Eskiz sozlanishi kerak.
            </p>
          )}

          <div className="auth-tabs" role="tablist" aria-label="Kirish turi">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'user'}
              className={mode === 'user' ? 'selected' : ''}
              onClick={() => { setMode('user'); setError(''); }}
            >
              Foydalanuvchi
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'director'}
              className={mode === 'director' ? 'selected' : ''}
              onClick={() => { setMode('director'); setError(''); }}
            >
              Direktor
            </button>
          </div>

          {mode === 'user' && (
            <form onSubmit={step === 'phone' ? requestCode : verifyCode} className="login-form">
              {step === 'phone' ? (
                <label>
                  <span>Telefon raqam</span>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                      <path d="M10 18h4" />
                    </svg>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+998 90 123 45 67"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </div>
                </label>
              ) : (
                <>
                  <p className="code-hint">+{phone.replace(/\D/g, '')} raqamiga yuborilgan SMS kodni kiriting.</p>
                  <label>
                    <span>SMS kod</span>
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
                        pattern="[0-9]{6}"
                        maxLength="6"
                        required
                      />
                    </div>
                  </label>
                  <div className="code-actions">
                    <button type="button" className="text-btn" onClick={() => { setStep('phone'); setCode(''); setError(''); }}>
                      Raqamni o'zgartirish
                    </button>
                    <button
                      type="button"
                      className="text-btn"
                      onClick={requestCode}
                      disabled={busy || resendIn > 0 || !authApiUrl}
                    >
                      {resendIn > 0 ? `Qayta yuborish (${resendIn})` : 'Kodni qayta yuborish'}
                    </button>
                  </div>
                </>
              )}

              {error && <p className="error-text" role="alert">{error}</p>}

              <button type="submit" className="primary-btn wide-btn" disabled={busy || !authApiUrl}>
                <span>{busy ? 'Kuting...' : step === 'phone' ? 'SMS kod yuborish' : 'Kodni tasdiqlash'}</span>
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
              {error && <p className="error-text" role="alert">{error}</p>}
              <button type="submit" className="primary-btn wide-btn" disabled={busy || !authApiUrl}>
                <span>{busy ? 'Kuting...' : 'Kirish'}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function BlankWorkspace({ user, onLogout }) {
  return (
    <div className="blank-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="logo-mark">IT</div>
          <span>IT TAT</span>
        </div>

        <div className="topbar-actions">
          <span className="user-pill">{user.role === 'director' ? 'Direktor' : 'Foydalanuvchi'}</span>
          <button type="button" className="primary-btn" onClick={onLogout}>Chiqish</button>
        </div>
      </header>

      <main className="blank-page">
        <div className="canvas" />
      </main>
    </div>
  );
}

export default App;