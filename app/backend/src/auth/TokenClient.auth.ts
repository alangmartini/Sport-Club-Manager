import ITokenPayload from '../interfaces/auth/ITokenPayload.interface';
import ITokenProvider from '../interfaces/auth/ITokenProvider.interface';
import JWTokenProvider from './JWToken.auth';

class TokenClient {
  private _tokenProvider: ITokenProvider;

  constructor() {
    this._tokenProvider = new JWTokenProvider();
  }

  generateToken(payload: ITokenPayload) {
    return this._tokenProvider.generateToken(payload);
  }

  verifyToken(token: string) {
    return this._tokenProvider.verifyToken(token);
  }
}

export default TokenClient;