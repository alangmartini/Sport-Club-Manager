import ITokenPayload from '../interfaces/auth/ITokenPayload.interface';
import ITokenProvider from '../interfaces/auth/ITokenProvider.interface';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

class JWTokenProvider implements ITokenProvider{
  private _secret: Secret = process.env.JWT_SECRET || 'secret';

  generateToken(payload: ITokenPayload): string {
    return jwt.sign(payload, this._secret)
  }
  

  verifyToken(token: string): ITokenPayload {
    return jwt.verify(token, this._secret) as ITokenPayload;
  }
}

export default JWTokenProvider;