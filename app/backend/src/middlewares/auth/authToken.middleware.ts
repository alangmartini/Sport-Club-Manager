import { Response, NextFunction } from 'express';
import TokenClient from '../../modules/auth/TokenClient.client';
import TTokenVerifcationResult from '../../types/TTokenResult.type';
import EnumAuthError from '../../enums/AuthError.enum';
import BasedError from '../../errors/BasedError.class';

class AuthToken {
  typeOfError = EnumAuthError.TOKEN_INVALID;

  constructor() {
    this.middleware = this.middleware.bind(this);
  }

  middleware(
    req: any, // any must be used instead of Response because we store user in req.user
    res: Response,
    next: NextFunction,
  ) {
    const authToken = req.headers.authorization;

    if (!authToken) return;
    const tokenClient = new TokenClient();

    try {
      const result: TTokenVerifcationResult = tokenClient.verifyToken(authToken
        .replace('Bearer', '').replace(' ', ''));

      if (result instanceof Error) throw new BasedError('', this.typeOfError);

      req.user = result;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthToken;
