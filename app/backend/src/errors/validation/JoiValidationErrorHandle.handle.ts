import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';

class JoiValidationErrorHandle
implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumErrorValidation.EMAIL_OR_PASSWORD_INVALID:
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.output = {
          message: 'Invalid email or password',
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

export default JoiValidationErrorHandle;
