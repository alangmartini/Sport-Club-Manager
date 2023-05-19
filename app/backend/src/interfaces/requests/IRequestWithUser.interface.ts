import { Request } from 'express';
import ITokenPayload from '../modules/auth/ITokenPayload.interface';

interface IRequestWithUser extends Request {
  user: ITokenPayload | string
}

export default IRequestWithUser;
