import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from 'process';


export default defineConfig({
  schema: './src/server/db/schema.ts',
  dialect: 'singlestore',
  dbCredentials: {
    host: env.DB_HOST!,
    port: parseInt(env.DB_PORT!),
    user: env.DB_USER!,
    password: env.DB_PASSWORD!,
    database: env.DB_NAME!,
    // support HANDSHAKE_NO_SSL_SUPPORT
  }
});