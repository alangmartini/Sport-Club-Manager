import TStatusCode from '../../types/IStatusCode.type';

interface IExpressErrorOutput {
  statusCode: TStatusCode;
  error: string;
  message: string; 
}

export default IExpressErrorOutput;