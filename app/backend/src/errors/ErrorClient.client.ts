import IErrorClient from '../interfaces/errors/IErrorClient.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import BoomErrorHandle from './BoomErrorHandle.handle';
import ValidationErrorHandle from './validation/ValidationErrorHandle.handle';
import EnumErrorHTTP from '../enums/HTTPerror.enum';
import BasedError from './BasedError.class';
import EnumErrorValidation from '../enums/ErrorValidation.enum';
import EnumExistenceError from '../enums/ExistenceError.enum';
import ExistenceErrorHandle from './existence/ExistenceErrorHandle.handle';
import EnumAuthError from '../enums/AuthError.enum';
import AuthErrorHandle from './auth/AuthErrorHandle.handle';
import EnumBusinessRulesError from '../enums/BusinessRulesError.enum';
import BusinessErrorhandle from './business/BusinessErrorhandle.handle';

class ErrorClient implements IErrorClient {
  errorHandle: IErrorHandle;
  errorsHandlers = [
    {
      handle: BoomErrorHandle,
      enum: Object.keys(EnumErrorHTTP),
    },
    {
      handle: ValidationErrorHandle,
      enum: Object.keys(EnumErrorValidation),
    },
    {
      handle: ExistenceErrorHandle,
      enum: Object.keys(EnumExistenceError),
    },
    {
      handle: AuthErrorHandle,
      enum: Object.keys(EnumAuthError),
    },
    {
      handle: BusinessErrorhandle,
      enum: Object.keys(EnumBusinessRulesError),
    },
  ];

  constructor(error: BasedError) {
    /*
      Errors handlers are responsible for formating
      the errors from diferents sources.
      It also provide an easy way to change how errors are handled,
      since you just need to create a new Handle and insert here.
    */
    const errorObject = this.errorsHandlers
      .find((errorsObjects) => {
        const isIn = errorsObjects.enum.includes(error.type);

        return isIn;
      });

    const HandleToInstantiate = errorObject?.handle;

    this.errorHandle = HandleToInstantiate
      ? new HandleToInstantiate(error) : new BoomErrorHandle(error);
  }

  getStatus(): number {
    return this.errorHandle.statusCode;
  }

  getOutput(): IExpressErrorOutput {
    return this.errorHandle.output;
  }
}

export default ErrorClient;
