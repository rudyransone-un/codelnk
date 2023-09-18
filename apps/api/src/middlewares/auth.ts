import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../service/token';
import { ConfigService } from '../service/config';
import { db } from '../db/db';

type JwtUserPayload = {
  userId: number;
  email: string;
};

export interface AuthorizationRequest extends Request {
  user: JwtUserPayload;
}

export function authorization(
  req: AuthorizationRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenService = new TokenService(new ConfigService(), db);
    const user = tokenService.validate(accessToken);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user as JwtUserPayload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
