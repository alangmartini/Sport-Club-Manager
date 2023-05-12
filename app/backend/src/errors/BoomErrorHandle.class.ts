import IErrorHandle from '../interfaces/error.interface';
import * as Boom from '@hapi/boom';

class BoomErrorHandle implements IErrorHandle{
  handle(error: IError): IError {
    const boomError = Boom.badImplementation;
  }
};

export default BoomErrorHandle;
