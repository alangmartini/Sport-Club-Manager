import { NextFunction, Request, Response } from 'express';
import IValidationClient from './IValidationClient.interface';
import TRuleSet from '../../types/TRuleSet.type';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';

interface IValidationMiddleware {
  validationClient: IValidationClient;
  ruleSet: TRuleSet;
  typeOfError: string;

  middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}

export default IValidationMiddleware;
