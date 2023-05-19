import ITokenPayload from '../interfaces/modules/auth/ITokenPayload.interface';

type TTokenVerifcationResult = ITokenPayload | string | Error;

export default TTokenVerifcationResult;
