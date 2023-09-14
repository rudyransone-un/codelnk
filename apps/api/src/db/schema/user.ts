import { sql, relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { files } from './file';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').unique(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  time: text('time').default(sql`CURRENT_TIME`),
  date: text('date').default(sql`CURRENT_DATE`),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  files: many(files),
}));

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
