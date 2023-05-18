import * as Boom from '@hapi/boom';
import IErrorClient from '../interfaces/errors/IErrorClient.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import BoomErrorHandle from './BoomErrorHandle.handle';
import JoiValidationErrorHandle from './JoiValidationErrorHandle.handle';
import EnumErrorHTTP from '../enums/HTTPerror.enum';
import EnumValidation from '../enums/validation.enum';
import BasedError from './BasedError.class';
import EnumErrorValidation from '../enums/ErrorValidation.enum';
import EnumExistenceError from '../enums/ExistenceError.enum';
import ExistenceErrorHandle from './ExistenceErrorHandle.handle';

class ErrorClient implements IErrorClient {
  errorHandle: IErrorHandle;

  constructor(error: BasedError) {
    /*
      Errors handlers are responsible for formating
      the errors from diferents sources.
      It also provide an easy way to change how errors are handled,
      since you just need to create a new Handle and insert here.
    */

    /*
      Errors come here as normal Errors and then
      mapped to Boom errors.
    */ 
    if (error.type in EnumErrorHTTP) {
      this.errorHandle = new BoomErrorHandle(error);
      return;
    }

    /*
      In Validations usually the validator ( Joi in this case ),
    */
    if (error.type in EnumErrorValidation) {
      this.errorHandle = new JoiValidationErrorHandle(error);
      return;
    }

    if (error.type in EnumExistenceError) {
      this.errorHandle = new ExistenceErrorHandle(error);
    }

    this.errorHandle = new BoomErrorHandle(error);
  }

  getStatus(): number {
    return this.errorHandle.statusCode;
  }

  getOutput(): IExpressErrorOutput {
    return this.errorHandle.output;
  }
}

export default ErrorClient;
