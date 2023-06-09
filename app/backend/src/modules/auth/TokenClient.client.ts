import ITokenClient from '../../interfaces/modules/auth/ITokenClient.interface';
import ITokenPayload from '../../interfaces/modules/auth/ITokenPayload.interface';
import ITokenProvider from '../../interfaces/modules/auth/ITokenProvider.interface';
import TTokenVerifcationResult from '../../types/TTokenResult.type';
import JWTokenProvider from './JWToken.provider';

class TokenClient implements ITokenClient {
  tokenProvider: ITokenProvider;

  constructor() {
    this.tokenProvider = new JWTokenProvider();
  }

  generateToken(payload: ITokenPayload): string {
    return this.tokenProvider.generateToken(payload);
  }

  verifyToken(token: string): TTokenVerifcationResult {
    return this.tokenProvider.verifyToken(token);
  }
}

export default TokenClient;
