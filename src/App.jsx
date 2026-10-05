import { useEffect, useState } from 'react';
import './App.css';

const demoUsers = [
  { email: 'tabaka@gmail.com', password: '123456789', role: 'user', name: 'Shirin User' },
  { email: 'tabaka@gmail.com', password: '123456789', role: 'admin', name: 'Shirin Admin' },
];

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('booknest-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('booknest-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('booknest-user');
    }
  }, [user]);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return <BlankWorkspace user={user} onLogout={() => setUser(null)} />;
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('tabaka@gmail.com');
  const [password, setPassword] = useState('123456789');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundUser = demoUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password.trim() &&
        item.role === role
    );

    if (!foundUser) {
      setError('Email yoki parol xato.');
      return;
    }

    onLogin({
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-backdrop" />
      <div className="login-shell">
        <div className="login-card">
          <div className="brand-row">
            <div className="logo-mark">S</div>
            <span>Shirin Tabaka</span>
          </div>

          <div className="role-toggle" aria-label="login role">
            <button
              type="button"
              className={role === 'user' ? 'selected' : ''}
              onClick={() => setRole('user')}
            >
              Foydalanuvchi
            </button>
            <button
              type="button"
              className={role === 'admin' ? 'selected' : ''}
              onClick={() => setRole('admin')}
            >
              Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <span>Elektron pochta</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tabaka@gmail.com"
              />
            </label>

            <label>
              <span>Parol</span>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="primary-btn wide-btn">
              tizimga kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BlankWorkspace({ user, onLogout }) {
  return (
    <div className="blank-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="logo-mark">S</div>
          <span>Shirin Tabaka</span>
        </div>

        <div className="topbar-actions">
          <span className="user-pill">{user.role === 'admin' ? 'Admin' : 'User'}</span>
          <button type="button" className="primary-btn" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="blank-page">
        <div className="canvas" />
      </main>
    </div>
  );
}

export default App;