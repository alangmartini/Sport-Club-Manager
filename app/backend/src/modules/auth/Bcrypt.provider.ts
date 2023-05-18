import * as bcrypt from 'bcryptjs';
import IHashProvider from '../../interfaces/auth/IHashProvider.interface';

class BCryptProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
};

export default BCryptProvider;