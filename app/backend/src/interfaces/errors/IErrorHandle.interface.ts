import TStatusCode from '../../types/IStatusCode.type';
import IExpressErrorOutput from './IExpressErrorOutput.interface';

interface IErrorHandle {
  statusCode: TStatusCode;
  output: IExpressErrorOutput;
}

export default IErrorHandle;