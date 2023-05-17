import TStatusCode from '../../types/TStatusCode.type';

interface IExpressErrorOutput {
  statusCode: TStatusCode;
  error: string;
  message: string; 
}

export default IExpressErrorOutput;