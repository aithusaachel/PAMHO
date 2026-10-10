import os
import psycopg2
import json

DATABASE_URL = "postgresql://neondb_owner:npg_OZaPCA5jYXN7@ep-broad-cake-auqszd99.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require"

def main():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    cur.execute('SELECT "formType", count(*) FROM submissions GROUP BY "formType"')
    types = cur.fetchall()
    print("Form Types and Counts:")
    for t in types:
        print(f" - {t[0]}: {t[1]}")
        
    for t in types:
        form_type = t[0]
        cur.execute('SELECT data FROM submissions WHERE "formType" = %s LIMIT 1', (form_type,))
        sample = cur.fetchone()[0]
        print(f"\nSample for {form_type}:")
        print(json.dumps(sample, indent=2))
        
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
