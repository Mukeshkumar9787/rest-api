// data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DB_SERVER_URL,
  // host: process.env.DB_SERVER_HOST,
  // port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  database: process.env.DB_SERVER_DB_NAME,
  // username: process.env.DB_SERVER_USERNAME,
  // password: process.env.DB_SERVER_PASSWORD,
  ssl: true,
});
