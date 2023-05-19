import IHashClient from '../../interfaces/auth/IHashClient.interface';
import IHashProvider from '../../interfaces/auth/IHashProvider.interface';
import BCryptProvider from './Bcrypt.provider';

export default class HashClient implements IHashClient {
  hashProvider: IHashProvider;

  constructor() {
    const hashProvider = new BCryptProvider();

    this.hashProvider = hashProvider;
  }

  async generateHash(payload: string): Promise<string> {
    return this.hashProvider.generateHash(payload);
  }

  async compareHash(payload:string, hashed:string): Promise<boolean> {
    return this.hashProvider.compareHash(payload, hashed);
  }
}
