import IHashProvider from '../interfaces/auth/IHashProvider.interface';
import BCryptProvider from './Bcrypt.auth';

export default class HashClient {
  private _hashProvider: IHashProvider;
  
  constructor() {
    const hashProvider = new BCryptProvider()

    this._hashProvider = hashProvider;
  }

  async hashPassword(payload: string): Promise<string> {
    return this._hashProvider.generateHash(payload);
  }

  async compareHash(payload:string, hashed:string): Promise<boolean> {
    return this._hashProvider.compareHash(payload, hashed);
  }
}
