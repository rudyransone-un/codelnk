import { eq, or } from 'drizzle-orm';

import { db } from '../db/db';
import { users } from '../db/schema/user';
import type { UserInsert } from '../db/schema/user';
import { comparePassword, generateToken } from '../helpers/security';
import { TokenService } from './token';
import { ConfigService } from './config';

interface LoginDto {
  email: string;
  password: string;
}

// https://www.geeksforgeeks.org/jwt-authentication-with-refresh-tokens/
// TODO: Вынести логику метода login в controllers/user, services/user
export async function login(user: LoginDto) {
  const [su] = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));

  console.log('user', su);

  if (!su) {
    console.log('else');
    return null;
  }

  if (!comparePassword(user.password, su.password)) {
    console.log('Invalid password', {
      password: user.password,
      hashPassword: su.password,
    });
    return null;
  }
  const tokenService = new TokenService(new ConfigService(), db);

  const payload = {
    userId: su.id,
    username: su.username,
  };

  const { accessToken, refreshToken } =
    tokenService.generate(payload);

  await tokenService.save({ userId: su.id, refreshToken });

  return { accessToken, refreshToken };
}

export async function createUser(user: UserInsert) {
  try {
    const [su] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.username, user.username!), // TODO: убрать optional с поля username в схеме user
          eq(users.email, user.email),
        ),
      );

    if (!su) {
      const [us] = await db
        .insert(users)
        .values(user)
        .returning({ userId: users.id });

      return us;
    }

    return null;
  } catch (e) {
    console.error(e);
  }
}
