import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumExistenceError from '../../enums/ExistenceError.enum';

export const ExistenceErrorMessages = {
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
  noMatchCreateBody: {
    output: { message: 'No body for creating a new match sent' },
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
        this.updateStatusAndOutput(ExistenceErrorMessages.noEmailAndPassword);

        break;
      case EnumExistenceError.NO_TOKEN:
        this.updateStatusAndOutput(ExistenceErrorMessages.noToken);

        break;

      case EnumExistenceError.NO_GOALS_BODY:
        this.updateStatusAndOutput(ExistenceErrorMessages.noGoalsBody);
        break;

      case EnumExistenceError.NO_NEW_MATCH_BODY:
        this.updateStatusAndOutput(ExistenceErrorMessages.noMatchCreateBody);
        break;

      default:
        this.updateStatusAndOutput(ExistenceErrorMessages.internalServerError);
    }
  }
}

export default ExistenceErrorHandle;
