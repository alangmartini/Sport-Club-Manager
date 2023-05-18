import { NextFunction, Request, Response } from 'express';
import IValidationClient from './IValidationClient.interface';
import TRuleSet from '../../types/TRuleSet.type';
import EnumErrorValidation from '../../enums/ValidationError.enum';

interface IValidationMiddleware {
  validationClient: IValidationClient;
  validationRequired: string;
  ruleSet: TRuleSet;
  typeOfError: string;

  middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}

export default IValidationMiddleware;
