import pg from 'pg';
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
    const res = await client.query('SELECT "formType", count(*) FROM submissions GROUP BY "formType"');
    console.log("Form Types and Counts:");
    for (const row of res.rows) {
      console.log(` - ${row.formType}: ${row.count}`);
    }
    
    for (const row of res.rows) {
      const typeRes = await client.query('SELECT data FROM submissions WHERE "formType" = $1 LIMIT 1', [row.formType]);
      console.log(`\nSample for ${row.formType}:`);
      console.log(JSON.stringify(typeRes.rows[0].data, null, 2));
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
