import { db } from '../db/db';
import { users } from '../db/schema/user';
import type { User, UserInsert } from '../db/schema/user';

export async function createUser(user: UserInsert) {
  try {
    return await db
      .insert(users)
      .values(user)
      .returning({ createdId: users.id });
  } catch (e) {
    console.error(e);
  }
}
