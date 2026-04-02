import { useState, useEffect, useCallback } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function fmt(n) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);
}

function timeAgo(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ---------- LOGIN ----------
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const res = await fetch(`${API}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `${isRegister ? 'Registration' : 'Login'} failed`);
      onLogin(data.token, data.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="bank-logo">
          <span className="logo-name">sage</span>
        </div>
        <p className="login-subtitle">Your personal banking demo</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={isRegister ? 'Choose a username' : 'alice / bob / demo'}
            required
            autoFocus
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={isRegister ? 'Choose a password' : '••••••••'}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (isRegister ? 'Creating account…' : 'Signing in…') : (isRegister ? 'Create account' : 'Sign in')}
          </button>
        </form>

        <p className="toggle-auth" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
          {isRegister ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </p>

        {!isRegister && (
          <div className="demo-hint">
            <p>Demo accounts</p>
            <div className="demo-accounts">
              <span onClick={() => { setUsername('alice'); setPassword('password123'); }}>alice / password123</span>
              <span onClick={() => { setUsername('demo');  setPassword('demo'); }}>demo / demo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- TRANSACTION ROW ----------
function TxRow({ tx }) {
  const isDeposit = tx.type === 'deposit';
  return (
    <div className={`tx-row ${tx.type}`}>
      <div className="tx-icon">{isDeposit ? '↑' : '↓'}</div>
      <div className="tx-info">
        <span className="tx-type">{isDeposit ? 'Deposit' : 'Withdrawal'}</span>
        <span className="tx-date">{timeAgo(tx.date)}</span>
      </div>
      <div className="tx-amounts">
        <span className={`tx-amount ${tx.type}`}>
          {isDeposit ? '+' : '-'}{fmt(tx.amount)}
        </span>
        <span className="tx-balance">{fmt(tx.balance)}</span>
      </div>
    </div>
  );
}

// ---------- DASHBOARD ----------
function Dashboard({ token, username, onLogout }) {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const fetchAccount = useCallback(async () => {
    const res = await fetch(`${API}/api/account`, {
      headers: { Authorization: token },
    });
    if (!res.ok) {
      onLogout();
      return;
    }
    const data = await res.json();
    setAccount(data);
  }, [token, onLogout]);

  useEffect(() => { fetchAccount(); }, [fetchAccount]);

  async function transact(type) {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      setStatus({ msg: 'Enter a valid amount', type: 'error' });
      return;
    }
    setLoading(true);
    setStatus({ msg: '', type: '' });
    try {
      const res = await fetch(`${API}/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus({ msg: data.message, type: 'success' });
      setAmount('');
      fetchAccount();
    } catch (err) {
      setStatus({ msg: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch(`${API}/api/logout`, {
      method: 'POST',
      headers: { Authorization: token },
    });
    onLogout();
  }

  if (!account) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="bank-logo small">
          <span className="logo-name">sage</span>
        </div>
        <div className="header-right">
          <span className="welcome">Hello, {account.username}</span>
          <button className="btn-ghost" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <main className="dash-main">
        {/* Balance card */}
        <section className="balance-card">
          <p className="balance-label">Current balance</p>
          <h1 className="balance-amount">{fmt(account.balance)}</h1>
          <p className="account-tag">Personal Account · GBP</p>
        </section>

        {/* Action panel */}
        <section className="action-panel">
          <h2>Make a transaction</h2>
          <div className="amount-input-wrap">
            <span className="currency-symbol">£</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="amount-input"
            />
          </div>

          {/* Quick amounts */}
          <div className="quick-amounts">
            {[50, 100, 250, 500].map(q => (
              <button key={q} className="btn-quick" onClick={() => setAmount(String(q))}>
                £{q}
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="btn-deposit" onClick={() => transact('deposit')} disabled={loading}>
              ↑ Deposit
            </button>
            <button className="btn-withdraw" onClick={() => transact('withdraw')} disabled={loading}>
              ↓ Withdraw
            </button>
          </div>

          {status.msg && (
            <p className={`status-msg ${status.type}`}>{status.msg}</p>
          )}
        </section>

        {/* Transactions */}
        <section className="transactions">
          <h2>Recent transactions</h2>
          {account.transactions.length === 0 ? (
            <p className="no-tx">No transactions yet — make your first deposit!</p>
          ) : (
            <div className="tx-list">
              {account.transactions.map(tx => <TxRow key={tx.id} tx={tx} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// ---------- ROOT ----------
export default function App() {
  const [auth, setAuth] = useState(() => {
    const t = sessionStorage.getItem('vault_token');
    const u = sessionStorage.getItem('vault_user');
    return t ? { token: t, username: u } : null;
  });

  function handleLogin(token, username) {
    sessionStorage.setItem('vault_token', token);
    sessionStorage.setItem('vault_user', username);
    setAuth({ token, username });
  }

  function handleLogout() {
    sessionStorage.clear();
    setAuth(null);
  }

  return auth
    ? <Dashboard token={auth.token} username={auth.username} onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />;
}
