import { Request, Response, NextFunction } from 'express';
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
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authToken = req.headers.authorization;

    if (!authToken) return;
    const tokenClient = new TokenClient();

    try {
      const result: TTokenVerifcationResult = tokenClient.verifyToken(authToken);

      if (result instanceof Error) throw new BasedError('', this.typeOfError);

      if (!req.body) {
        req.body = { user: result };
      }

      req.body.user = result;

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default AuthToken;
