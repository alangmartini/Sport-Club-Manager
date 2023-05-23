import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import ITokenPayload from '../../interfaces/modules/auth/ITokenPayload.interface';
import ITokenProvider from '../../interfaces/modules/auth/ITokenProvider.interface';
import TTokenVerifcationResult from '../../types/TTokenResult.type';

class JWTokenProvider implements ITokenProvider {
  private _secret: Secret = process.env.JWT_SECRET || 'secret';
  hm = '';

  generateToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this._secret);
  }

  verifyToken(token: string): TTokenVerifcationResult {
    // jwt will throw and error on failure
    try {
      const result = jwt.verify(token, this._secret) as ITokenPayload;

      return result;
    } catch (e) {
      return new Error();
    }
  }
}

export default JWTokenProvider;
