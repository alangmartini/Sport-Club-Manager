import {
  NextFunction,
  Request,
  Response,
} from 'express';
import ErrorClient from '../errors/ErrorClient.class';
import IErrorClient from '../interfaces/errors/IErrorClient.interface';
import TStatusCode from '../types/TStatusCode.type';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import BasedError from '../errors/BasedError.class';

function errorMiddleware(
  error: BasedError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const errorClient: IErrorClient = new ErrorClient(error);

  const statusCode: TStatusCode =
    errorClient.getStatus();

  const output: IExpressErrorOutput =
    errorClient.getOutput();

  if (output.message === 'Unauthorized') {
    return res.status(statusCode).json({ message: 'Invalid email or password' });
  }

  res.status(statusCode).json(output);
}

export default errorMiddleware;
