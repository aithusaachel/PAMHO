import pg from 'pg';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_OZaPCA5jYXN7@ep-broad-cake-auqszd99.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT "formType", data FROM submissions');
    const records = res.rows;
    await fs.writeFile('../backend/old_submissions.json', JSON.stringify(records, null, 2));
    console.log(`Exported ${records.length} records.`);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
