import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import ITokenPayload from '../../interfaces/auth/ITokenPayload.interface';
import ITokenProvider from '../../interfaces/auth/ITokenProvider.interface';

class JWTokenProvider implements ITokenProvider {
  private _secret: Secret = process.env.JWT_SECRET || 'secret';
  hm = '';

  generateToken(payload: ITokenPayload): string {
    console.log(this.hm);
    return jwt.sign(payload, this._secret);
  }

  verifyToken(token: string): ITokenPayload {
    console.log(this.hm);
    return jwt.verify(token, this._secret) as ITokenPayload;
  }
}

export default JWTokenProvider;
