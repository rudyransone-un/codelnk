import express from 'express';

import { createUser } from '../service/user';

export const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!(email && password) || !(email || password))
    return res
      .status(401)
      .json({ error: 'Invalid email or password' });

  const createdUser = await createUser({ username, email, password });

  res.status(201).json({ user: { id: createdUser![0].createdId } });
});

router.post('/login', (req, res) => {});

router.post('/logout', (req, res) => {});
