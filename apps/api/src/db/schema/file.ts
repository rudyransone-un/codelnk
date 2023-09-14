import { sql, relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { users } from './user';

export const files = sqliteTable('files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  size: integer('size').notNull(),
  filetype: text('filetype').notNull(),
  time: text('time').default(sql`CURRENT_TIME`),
  date: text('date').default(sql`CURRENT_DATE`),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  userId: integer('userId').references(() => users.id),
});

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
}));

export type File = typeof files.$inferSelect;
export type FileInsert = typeof files.$inferInsert;
