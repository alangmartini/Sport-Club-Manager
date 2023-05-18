import * as bcrypt from 'bcryptjs';
import IHashProvider from '../../interfaces/auth/IHashProvider.interface';

class BCryptProvider implements IHashProvider {
  hm = '';

  async generateHash(payload: string): Promise<string> {
    console.log(this.hm);
    return bcrypt.hash(payload, 10);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    console.log(this.hm);
    return bcrypt.compare(payload, hashed);
  }
}

export default BCryptProvider;
