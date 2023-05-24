import {
  NextFunction,
  Request,
  Response,
} from 'express';
// import EnumValidation from '../../enums/validation.enum';
import IUserBody from '../../interfaces/users/IUserBody.interface';
import IValidationMiddleware
  from '../../interfaces/modules/validation/IValidationMiddleware.interface';
import ValidationClient from '../../modules/validation/ValidationClient.client';
// import TRuleSet from '../../types/TRuleSet.type';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';

class validateEmailAndPassword implements IValidationMiddleware {
  validationClient: ValidationClient<IUserBody>;

  typeOfError: EnumErrorValidation = EnumErrorValidation
    .EMAIL_OR_PASSWORD_INVALID;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.validationClient = new ValidationClient(
      // this.ruleSet,
      this.typeOfError,
    );
  }

  middleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user: IUserBody = req.body;

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
