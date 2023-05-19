import TTokenVerifcationResult from '../../../types/TTokenResult.type';
import ITokenPayload from './ITokenPayload.interface';

interface ITokenProvider {
  generateToken(payload: ITokenPayload): string;
  verifyToken(token: string): TTokenVerifcationResult;
}

export default ITokenProvider;
