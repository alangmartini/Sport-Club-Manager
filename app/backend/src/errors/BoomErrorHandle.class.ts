import * as Boom from '@hapi/boom';
import EnumError from '../enums/error.enum';
import TStatusCode from '../types/IStatusCode.type';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';

class BoomErrorHandle implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  private _boomError: Boom.Boom;

  constructor(error: Error)  {
    switch(error.name) {
      case EnumError.badImplementation:
        this._boomError = Boom.badImplementation();
        break;
      case EnumError.notFound:
        this._boomError = Boom.notFound();
        break;
      case EnumError.unauthorized:
        this._boomError = Boom.unauthorized();
        break;
      default:
        this._boomError = Boom.internal()
    }

    this.updateStatusAndOutput(this._boomError);
  }

  updateStatusAndOutput(boomError: Boom.Boom) {
    this.statusCode = boomError.output
      .statusCode;

    this.output = boomError.output.payload;
  }
}

export default BoomErrorHandle;
