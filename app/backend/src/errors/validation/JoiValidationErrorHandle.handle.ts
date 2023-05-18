import * as Joi from 'joi';
import EnumErrorHTTP from '../../enums/HTTPerror.enum';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import EnumValidation from '../../enums/validation.enum';
import BasedError from '../BasedError.class';
import { StatusCodes } from 'http-status-codes';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';

class JoiValidationErrorHandle
  implements IErrorHandle
{
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
    }
  }
}

export default JoiValidationErrorHandle;
