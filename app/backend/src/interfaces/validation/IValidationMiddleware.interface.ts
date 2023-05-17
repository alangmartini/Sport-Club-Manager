import { NextFunction, Request, Response } from 'express';
import EnumValidation from '../../enums/validation.enum';
import IValidationClient from './IValidationClient.interface';

interface IValidationMiddleware {
  validationClient: IValidationClient;
  ruleSet: EnumValidation;
  middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}

export default IValidationMiddleware;
