import ITokenPayload from './ITokenPayload.interface';

interface ITokenProvider {
  generateToken(payload: ITokenPayload): string;
  verifyToken(token: string): ITokenPayload
}

export default ITokenProvider;
