import express from 'express';

import { generatePassword } from '../helpers/security';
import { createUser, login } from '../service/user';
import { TokenService } from '../service/token';
import { db } from '../db/db';
import { ConfigService } from '../service/config';
import { tokens } from '../db/schema/token';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema/user';

export const router = express.Router();

// TODO: Создать директорию для routes и controllers, services
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const response = await createUser({
    username,
    email,
    password: generatePassword(password),
  });

  if (!response)
    return res.json({
      error: 'User with this email address has already been created',
    });

  res.status(201).json({ user: { id: response.userId } });
});

router.post('/login', async (req, res) => {
  const response = await login(req.body);

  if (!response)
    return res.json({ error: 'Invalid email or password' });

  const { accessToken, refreshToken } = response;
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({ accessToken, refreshToken });
});

router.get('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenService = new TokenService(new ConfigService(), db);

  const [token] = await db
    .select()
    .from(tokens)
    .where(eq(tokens.refreshToken, refreshToken));
  const isValidate = await tokenService.validate(refreshToken);

  if (!isValidate || !token) {
    return res.status(401).json({ error: 'jwt token invalid' });
  }

  const [user] = await db
    .select({ userId: users.id, email: users.email })
    .from(users)
    .where(eq(users.id, token.userId!));

  const { accessToken, refreshToken: newRefreshToken } =
    tokenService.generate(user);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({ accessToken, newRefreshToken });
});

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'is already logout' });
  }

  const tokenService = new TokenService(new ConfigService(), db);

  const { refreshToken: token } =
    await tokenService.remove(refreshToken);
  res.clearCookie('refreshToken');

  res.json({ token });
});
