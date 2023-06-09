import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumAuthError from '../../enums/AuthError.enum';

const ExistenceErrorMessages = {
  invalidToken: {
    output: { message: 'Token must be a valid token' },
    status: StatusCodes.UNAUTHORIZED,
  },
  internalServerError: {
    output: {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    },
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
};

class AuthErrorHandle implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  updateStatusAndOutput({ status, output }: { status: TStatusCode; output: IExpressErrorOutput }) {
    this.statusCode = status;
    this.output = output;
  }

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumAuthError.TOKEN_INVALID:
        this.updateStatusAndOutput(ExistenceErrorMessages.invalidToken);

        break;
      default:
        this.updateStatusAndOutput(ExistenceErrorMessages.internalServerError);
    }
  }
}

export default AuthErrorHandle;
