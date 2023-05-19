import IHashProvider from './IHashProvider.interface';

interface IHashClient {
  hashProvider: IHashProvider;
  compareHash(payload: string, hashedPass: string): Promise<boolean>;
  generateHash(payload: string): Promise<string>;
}

export default IHashClient;
