import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumExistenceError from '../../enums/ExistenceError.enum';

export const ErrorMessages = {
  noEmailAndPassword: {
    output: { message: 'All fields must be filled' },
    status: StatusCodes.BAD_REQUEST,
  },
  noToken: {
    output: { message: 'Token not found' },
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
  noGoalsBody: {
    output: { message: 'No goals for home and away team provided' },
    status: StatusCodes.BAD_REQUEST,
  },
};

class ExistenceErrorHandle implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  updateStatusAndOutput({ status, output }: { status: TStatusCode; output: IExpressErrorOutput }) {
    this.statusCode = status;
    this.output = output;
  }

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumExistenceError.NO_EMAIL_AND_PASSWORD:
        this.updateStatusAndOutput(ErrorMessages.noEmailAndPassword);

        break;
      case EnumExistenceError.NO_TOKEN:
        this.updateStatusAndOutput(ErrorMessages.noToken);

        break;

      case EnumExistenceError.NO_GOALS_BODY:
        this.updateStatusAndOutput(ErrorMessages.noGoalsBody);
        break;

      default:
        this.updateStatusAndOutput(ErrorMessages.internalServerError);
    }
  }
}

export default ExistenceErrorHandle;
