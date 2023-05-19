import ITokenPayload from '../modules/auth/ITokenPayload.interface';

// Interface that shows how
// is the body structured after being validated by AuthMiddleware
interface ITokenPayloadInBody {
  user: ITokenPayload
}

export default ITokenPayloadInBody;
