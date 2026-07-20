import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'PAMHO API is running perfectly!' });
});

// Initialize PostgreSQL Connection Pool
// It automatically uses the DATABASE_URL environment variable if provided
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render requires SSL for external connections to their Postgres databases
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

async function initializeDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        "formType" TEXT NOT NULL,
        data JSONB NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('PostgreSQL Database initialized with submissions table');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  } finally {
    client.release();
  }
}

// Basic Authentication Middleware
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Basic (.+)$/);
  if (!match) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const decoded = Buffer.from(match[1], 'base64').toString();
  const [username, password] = decoded.split(':');
  
  if (username === 'admin' && password === 'admin123') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/api/submissions', async (req, res) => {
  const { formType, data } = req.body;
  if (!formType || !data) {
    return res.status(400).json({ error: 'Missing formType or data' });
  }
  
  try {
    // node-postgres (pg) automatically handles JSONB serialization for the data object
    const result = await pool.query(
      'INSERT INTO submissions ("formType", data) VALUES ($1, $2) RETURNING id',
      [formType, data]
    );
    res.status(201).json({ id: result.rows[0].id, success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

app.get('/api/submissions', checkAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY "createdAt" DESC');
    
    // node-postgres automatically parses JSONB columns back into JS objects
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

app.delete('/api/submissions/:id', checkAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM submissions WHERE id = $1', [req.params.id]);
    
    // rowCount tells us how many rows were affected by the query
    if (result.rowCount === 0) {
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

const PORT = process.env.PORT || 3000;

// Keep-alive script to prevent Render free tier from sleeping
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
if (RENDER_URL) {
  setInterval(() => {
    fetch(RENDER_URL)
      .then(() => console.log(`Keep-alive ping successful`))
      .catch((err) => console.error(`Keep-alive ping failed:`, err));
  }, 14 * 60 * 1000); // Ping every 14 minutes
}

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
  });
});
