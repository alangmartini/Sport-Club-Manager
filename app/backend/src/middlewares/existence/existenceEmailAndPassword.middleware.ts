import { NextFunction, Request, Response } from 'express';
import EnumExistenceError from '../../enums/ExistenceError.enum';
import IUserBody from '../../interfaces/users/IUserBody.interface';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import IExistenceMiddleware
  from '../../interfaces/modules/existence/IExistenceMiddleware.interface';
import ExistenceClient from '../../modules/existence/ExistenceClient.client';

class existenceAssertEmailAndPassword implements IExistenceMiddleware<IUserBody> {
  existenceClient: ExistenceClient<IUserBody>;
  object = { email: '', password: '' };
  typeOfError = EnumExistenceError.NO_EMAIL_AND_PASSWORD;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.existenceClient = new ExistenceClient(this.object, this.typeOfError);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    const user: IUserBody = req.body;

    try {
      const result: TValidateResult = this.existenceClient.assertExist(user);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default existenceAssertEmailAndPassword;
