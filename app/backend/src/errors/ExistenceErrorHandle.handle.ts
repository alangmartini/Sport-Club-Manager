import TStatusCode from '../types/TStatusCode.type';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';
import BasedError from './BasedError.class';
import { StatusCodes } from 'http-status-codes';
import EnumExistenceError from '../enums/ExistenceError.enum';

class ExistenceErrorHandle
  implements IErrorHandle
{
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumExistenceError.EMAIL_AND_PASSWORD:
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.output = {
          message: 'All fields must be filled',
        };

        break;
    }
  }
}

export default ExistenceErrorHandle;
