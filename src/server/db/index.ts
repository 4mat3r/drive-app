import { drizzle } from 'drizzle-orm/singlestore';
import { type Pool, createPool } from 'mysql2/promise';
import { env } from 'process';

const globalForDb = globalThis as unknown as { 
    conn: Pool | null;
};

const conn = globalForDb.conn ?? createPool({
    host: env.DB_HOST!,
    port: parseInt(env.DB_PORT!),
    user: env.DB_USER!,
    password: env.DB_PASSWORD!,
    database: env.DB_NAME!,
    maxIdle: 0,
});

if( env.NODE_ENV === 'production' ) globalForDb.conn = conn;

conn.addListener('error', (err) => {
    console.error('Database error', err);
});

export const db = drizzle(conn);
