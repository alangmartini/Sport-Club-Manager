import * as Boom from '@hapi/boom';
import IErrorClient from '../interfaces/errors/IErrorClient.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import BoomErrorHandle from './BoomErrorHandle.class';
import JoiValidationErrorHandle from './JoiValidationErrorHandle.class';
import EnumError from '../enums/error.enum';

class ErrorClient implements IErrorClient {
  errorHandle: IErrorHandle;

  constructor(error: Error) {
    /*
      Errors handlers are responsible for formating
      the errors from diferents sources.
      It also provide an easy way to change how errors are handled,
      since you just need to create a new Handle and insert here.
    */

    if (error.name in EnumError) {
      this.errorHandle = new BoomErrorHandle(error);
      return;
    }

    /*
      Since in validations errors the package
      itself is responsible for verifications, JOI
      errors are throw in Validation Middlewares objects.

      Thus this ErrorHandle, beside the original purpose of
      providing a easy way for modifications, also maps
      JOI (or other package) errors to proper messages to be shown.
    */
    if (error.name === 'ValidationError') {
      this.errorHandle = new JoiValidationErrorHandle(error);
      return;
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
