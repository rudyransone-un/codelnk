import jwt from 'jsonwebtoken';
import { ConfigService } from './config';
import { TokenInsert, tokens } from '../db/schema/token';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';

export class TokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly db: BetterSQLite3Database,
  ) {}

  generate<T extends object>(payload: T) {
    const accessToken = this.create(payload, '10m');
    const refreshToken = this.create(payload, '30d');

    return { accessToken, refreshToken };
  }

  create<T extends object>(payload: T, expiresIn: string) {
    return jwt.sign(payload, this.config.JWT_SECRET_KEY, {
      expiresIn,
    });
  }

  async validate(token: string) {
    try {
      return jwt.verify(token, this.config.JWT_SECRET_KEY);
    } catch (e) {
      return null;
    }
  }

  async save(token: TokenInsert) {
    const [tokenUser] = await this.db
      .select()
      .from(tokens)
      .where(eq(tokens.userId, token.userId!));

    if (!tokenUser) {
      const [newToken] = await this.db
        .insert(tokens)
        .values(token)
        .returning({ refreshToken: tokens.refreshToken });

      return newToken;
    }

    const [updateToken] = await this.db
      .update(tokens)
      .set({ refreshToken: token.refreshToken })
      .where(eq(tokens.userId, token.userId!))
      .returning({ refreshToken: tokens.refreshToken });

    return updateToken;
  }
  async remove(refreshToken: string) {
    const [deleteToken] = await this.db
      .delete(tokens)
      .where(eq(tokens.refreshToken, refreshToken))
      .returning({ refreshToken: tokens.refreshToken });

    console.log('token:service:remove', deleteToken);
    return deleteToken;
  }

  async find(refreshToken: string) {
    const [tokenUser] = await this.db
      .select()
      .from(tokens)
      .where(eq(tokens.refreshToken, refreshToken));

    return tokenUser;
  }
}
