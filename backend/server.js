import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { SubmissionSchema } from './validation.js';
import { checkAuth, publicSubmissionLimiter, adminLimiter } from './middleware.js';

// Fail-safe startup: ensure credentials exist
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  console.error('FATAL: ADMIN_USERNAME or ADMIN_PASSWORD environment variable is missing.');
  process.exit(1);
}

const { Pool } = pg;
const app = express();

// Trust the reverse proxy (e.g. Render) so rate limiting identifies true client IPs
// We configure this only as broadly as necessary. Setting it to 1 assumes exactly one reverse proxy.
app.set('trust proxy', 1);

// Configure CORS. If FRONTEND_URL is provided, restrict to it. Otherwise allow all (fallback for MVP).
const corsOptions = process.env.FRONTEND_URL 
  ? { origin: process.env.FRONTEND_URL.split(',').map(url => url.trim().replace(/\/$/, '')) } 
  : {};
app.use(cors(corsOptions));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'PAMHO API is running perfectly!' });
});

// Initialize PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

// ---------------------------------------------------------
// PUBLIC ENDPOINTS
// ---------------------------------------------------------
app.post('/api/submissions', publicSubmissionLimiter, async (req, res) => {
  try {
    // 1. Validate request body against Zod schemas
    const parsed = SubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: parsed.error.format() 
      });
    }

    const { formType, data } = parsed.data;

    // 2. Insert into database
    const result = await pool.query(
      'INSERT INTO submissions ("formType", data) VALUES ($1, $2) RETURNING id',
      [formType, data]
    );
    res.status(201).json({ id: result.rows[0].id, success: true });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// ---------------------------------------------------------
// PROTECTED ADMIN ENDPOINTS
// ---------------------------------------------------------
app.get('/api/submissions', adminLimiter, checkAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY "createdAt" DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

app.delete('/api/submissions/:id', adminLimiter, checkAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM submissions WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Options route to properly handle preflight for CORS with auth
app.options('*', cors(corsOptions));

// ---------------------------------------------------------
// SERVER INITIALIZATION
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;

const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
if (RENDER_URL) {
  setInterval(() => {
    fetch(RENDER_URL).catch(() => {});
  }, 14 * 60 * 1000); // Ping every 14 minutes
}

// Export app for testing purposes
export { app };

// Only start the server if we are running directly (not in tests)
if (process.env.NODE_ENV !== 'test') {
  initializeDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API running on port ${PORT}`);
    });
  });
}
