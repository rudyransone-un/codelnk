export class ConfigService {
  JWT_SECRET_KEY = process.env.SECRETE_KEY || 'secret_key';
}
