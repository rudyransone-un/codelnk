import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { users } from './user';

export const tokens = sqliteTable('tokens', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  refreshToken: text('refreshToken'),
  userId: integer('userId').references(() => users.id),
});

export type Token = typeof tokens.$inferSelect;
export type TokenInsert = typeof tokens.$inferInsert;
