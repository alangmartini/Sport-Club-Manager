import { NextFunction, Request, Response } from 'express';
import EnumExistenceError from '../../enums/ExistenceError.enum';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import IExistenceMiddleware
  from '../../interfaces/modules/existence/IExistenceMiddleware.interface';
import ExistenceClient from '../../modules/existence/ExistenceClient.client';
import TAuthHeader from '../../types/TAuthHeader.type';

class ExistenceToken implements IExistenceMiddleware<TAuthHeader> {
  existenceClient: ExistenceClient<TAuthHeader>;
  object = '';
  typeOfError = EnumExistenceError.NO_TOKEN;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.existenceClient = new ExistenceClient(this.object, this.typeOfError);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    try {
      const result: TValidateResult = this.existenceClient.assertExist(authToken);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default ExistenceToken;
