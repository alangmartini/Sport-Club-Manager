import {
  NextFunction,
  Request,
  Response,
} from 'express';
import IValidationMiddleware
  from '../../interfaces/modules/validation/IValidationMiddleware.interface';
import ValidationClient from '../../modules/validation/ValidationClient.client';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';
import INewMatchBody from '../../interfaces/matches/INewMatchBody.interface';

class validateNewMatch implements IValidationMiddleware {
  validationClient: ValidationClient<INewMatchBody>;

  typeOfError: EnumErrorValidation = EnumErrorValidation
    .SAME_TEAM_ERROR;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.validationClient = new ValidationClient(
      this.typeOfError,
    );
  }

  middleware(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    const match: INewMatchBody = req.body;

    try {
      const result: TValidateResult = this.validationClient.validate(match);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default validateNewMatch;
