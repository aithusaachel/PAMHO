import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'data.sqlite');

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded admin credentials
const ADMIN_USER = "admin";
const ADMIN_PASS = "pamho2026"; // basic hardcoded password

// Basic Auth Middleware
function checkAuth(req, res, next) {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login && password && login === ADMIN_USER && password === ADMIN_PASS) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
}

let db;

// Initialize Database
async function initializeDB() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formType TEXT NOT NULL,
      data TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.post('/api/submissions', async (req, res) => {
  const { formType, data } = req.body;
  if (!formType || !data) {
    return res.status(400).json({ error: 'Missing formType or data' });
  }
  
  try {
    const result = await db.run(
      'INSERT INTO submissions (formType, data) VALUES (?, ?)',
      formType,
      JSON.stringify(data)
    );
    res.status(201).json({ id: result.lastID, success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

app.get('/api/submissions', checkAuth, async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM submissions ORDER BY createdAt DESC');
    res.json(rows.map(row => ({
      ...row,
      data: JSON.parse(row.data)
    })));
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

app.delete('/api/submissions/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.run('DELETE FROM submissions WHERE id = ?', id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Options route to properly handle preflight for CORS with auth
app.options('*', cors());

// Serve static frontend files
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
