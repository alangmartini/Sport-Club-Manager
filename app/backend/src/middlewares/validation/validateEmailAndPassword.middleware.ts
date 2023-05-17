import { NextFunction, Request, Response } from 'express';
import EnumValidation from '../../enums/validation.enum';
import IUserBody from '../../interfaces/users/IUserBody.interface';
import IValidationMiddleware from '../../interfaces/validation/IValidationMiddleware.interface';
import ValidationClient from '../../validation/ValidationClient.class';
import TRuleSet from '../../types/TRuleSet.type';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';


class validateEmailAndPassword implements IValidationMiddleware {
  validationClient: ValidationClient<IUserBody>;
  ruleSet: TRuleSet = [EnumValidation.EMAIL_INVALID, EnumValidation.PASSWORD_INVALID];

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.validationClient = new ValidationClient(this.ruleSet);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    const user: IUserBody = req.body;
    console.log('user is:', user);

    try {
      const result: TValidateResult = this.validationClient.validate(user);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default validateEmailAndPassword;
 