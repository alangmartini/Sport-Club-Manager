import { StatusCodes } from 'http-status-codes';
import TStatusCode from '../../types/TStatusCode.type';
import IExpressErrorOutput from '../../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../../interfaces/errors/IErrorHandle.interface';
import BasedError from '../BasedError.class';
import EnumBusinessRulesError from '../../enums/BusinessRulesError.enum';

export const businessErrorMessages = {
  nonExistentTeam: {
    output: { message: 'There is no team with such id!' },
    status: StatusCodes.NOT_FOUND,
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

class BusinessErrorhandle implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  updateStatusAndOutput({ status, output }: { status: TStatusCode; output: IExpressErrorOutput }) {
    this.statusCode = status;
    this.output = output;
  }

  constructor(error: BasedError) {
    switch (error.type) {
      case EnumBusinessRulesError.NO_TEAM_MATCH:
        this.updateStatusAndOutput(businessErrorMessages.nonExistentTeam);
        break;
      default:
        this.updateStatusAndOutput(businessErrorMessages.internalServerError);
    }
  }
}

export default BusinessErrorhandle;
