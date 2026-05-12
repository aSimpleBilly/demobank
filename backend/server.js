const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory store (demo only — replace with a real DB in production)
const users = {
  'alice': { password: 'password123', balance: 5000.00, transactions: [] },
  'bob':   { password: 'letmein',     balance: 1250.50, transactions: [] },
  'demo':  { password: 'demo',        balance: 10000.00, transactions: [] },
};

// Simple session store (use JWT or proper sessions in production)
const sessions = {};

function requireAuth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  req.username = sessions[token];
  next();
}

// POST /api/register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }
  if (users[username.toLowerCase()]) {
    return res.status(409).json({ error: 'Username already taken' });
  }
  const key = username.toLowerCase();
  users[key] = { password, balance: 0, transactions: [] };
  const token = `${key}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessions[token] = key;
  res.status(201).json({ token, username: key });
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = `${username}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessions[token] = username;
  res.json({ token, username });
});

// POST /api/logout
app.post('/api/logout', requireAuth, (req, res) => {
  const token = req.headers['authorization'];
  delete sessions[token];
  res.json({ message: 'Logged out' });
});

// GET /api/account
app.get('/api/account', requireAuth, (req, res) => {
  const user = users[req.username];
  res.json({
    username: req.username,
    balance: user.balance,
    transactions: user.transactions.slice(-20).reverse(),
  });
});

// POST /api/transact — generic transaction endpoint for all verticals
app.post('/api/transact', requireAuth, (req, res) => {
  const { type, amount, direction } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'Transaction type required' });
  }
  const value = parseFloat(amount);
  if (isNaN(value) || value <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  const user = users[req.username];

  if (direction === 'out' && value > user.balance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  if (direction === 'in') {
    user.balance = parseFloat((user.balance + value).toFixed(2));
  } else {
    user.balance = parseFloat((user.balance - value).toFixed(2));
  }

  user.transactions.push({
    id: Date.now(),
    type,
    amount: value,
    balance: user.balance,
    date: new Date().toISOString(),
  });

  const verb = direction === 'in' ? 'Added' : 'Deducted';
  res.json({ balance: user.balance, message: `${verb} ${value.toFixed(2)} successfully` });
});

// Health check for Kubernetes liveness/readiness probes
app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
