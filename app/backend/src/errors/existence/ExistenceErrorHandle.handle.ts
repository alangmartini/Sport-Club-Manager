import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumExistenceError from '../../enums/ExistenceError.enum';

class ExistenceErrorHandle
implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumExistenceError.NO_EMAIL_AND_PASSWORD:
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.output = {
          message: 'All fields must be filled',
        };

        break;
      default:
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        this.output = {
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'An internal server error occurred',
        };
    }
  }
}

export default ExistenceErrorHandle;
