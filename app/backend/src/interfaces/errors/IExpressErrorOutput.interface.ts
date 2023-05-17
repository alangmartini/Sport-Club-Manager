import TStatusCode from '../../types/TStatusCode.type';

interface INormalErrorOutput {
  statusCode: TStatusCode;
  error: string;
  message: string; 
}

interface IValidationErrorOutput {
  message: string,
}

type IExpressErrorOutput = INormalErrorOutput | IValidationErrorOutput;

export default IExpressErrorOutput;