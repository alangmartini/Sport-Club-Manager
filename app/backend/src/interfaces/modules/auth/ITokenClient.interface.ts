import ITokenPayload from './ITokenPayload.interface';
import ITokenProvider from './ITokenProvider.interface';

interface ITokenClient {
  tokenProvider: ITokenProvider;
  generateToken(payload: ITokenPayload): string;
  verifyToken(token: string): ITokenPayload;
}

export default ITokenClient;
