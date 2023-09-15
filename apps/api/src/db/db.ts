import {
  drizzle,
  BetterSQLite3Database,
} from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';

const sqlite3 = new Database('db.sqlite3');
export const db: BetterSQLite3Database = drizzle(sqlite3, {
  logger: true,
});
