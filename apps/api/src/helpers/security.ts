import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function generatePassword(password: string): string {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(
  password: string,
  hashPassword: string,
) {
  return bcrypt.compareSync(password, hashPassword);
}

export function generateToken(payload: any, expiresIn: string) {
  return jwt.sign(payload, 'secret', { expiresIn });
}
