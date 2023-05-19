import { Request, Response, NextFunction } from 'express';
import TokenClient from '../../modules/auth/TokenClient.client';
import ITokenPayload from '../../interfaces/modules/auth/ITokenPayload.interface';

class AuthToken {
  constructor() {}

  middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log(this);
    const authToken = req.headers.authorization;

    /*
      This is just for TS lint, since there is a middleware
      that validates if null, empty or underfined.
    */
    if (!authToken) return;
    const tokenClient = new TokenClient();

    const isValid: ITokenPayload = tokenClient.verifyToken(authToken);

    
  }
}

export default AuthToken;
