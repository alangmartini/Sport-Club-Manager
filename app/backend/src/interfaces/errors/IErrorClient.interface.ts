import TStatusCode from '../../types/TStatusCode.type';
import IErrorHandle from './IErrorHandle.interface';
import IExpressErrorOutput from './IExpressErrorOutput.interface';

interface IErrorClient {
  errorHandle: IErrorHandle;
  getStatus(): TStatusCode;
  getOutput(): IExpressErrorOutput;
}

export default IErrorClient;
