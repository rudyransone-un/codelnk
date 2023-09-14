import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const files = sqliteTable('files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  size: integer('size').notNull(),
  filetype: text('filetype').notNull(),
  time: text('time').default(sql`CURRENT_TIME`),
  date: text('date').default(sql`CURRENT_DATE`),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
});

export type File = typeof files.$inferSelect;
export type FileInsert = typeof files.$inferInsert;
