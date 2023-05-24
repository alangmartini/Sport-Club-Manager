import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumErrorValidation from '../../enums/ErrorValidation.enum';

export const validationErrorMessages = {
  invalidEmailAndPassword: {
    output: {
      message: 'Invalid email or password',
    },
    status: StatusCodes.UNAUTHORIZED,
  },
  invalidSameTeamsMatch: {
    output: { message: 'It is not possible to create a match with two equal teams' },
    status: StatusCodes.UNPROCESSABLE_ENTITY,
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

class ValidationErrorHandle
implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  updateStatusAndOutput({ status, output }: { status: TStatusCode; output: IExpressErrorOutput }) {
    this.statusCode = status;
    this.output = output;
  }

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumErrorValidation.EMAIL_OR_PASSWORD_INVALID:
        this.updateStatusAndOutput(validationErrorMessages.invalidEmailAndPassword);
        break;
      case EnumErrorValidation.SAME_TEAM_ERROR:
        this.updateStatusAndOutput(validationErrorMessages.invalidSameTeamsMatch);
        break;
      default:
        this.updateStatusAndOutput(validationErrorMessages.internalServerError);
    }
  }
}

export default ValidationErrorHandle;
