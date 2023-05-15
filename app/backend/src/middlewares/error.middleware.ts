import {
  NextFunction,
  Request,
  Response,
} from 'express';
import ErrorClient from '../errors';
import IErrorClient from '../interfaces/errors/IErrorClient.interface';
import TStatusCode from '../types/IStatusCode.type';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const errorClient: IErrorClient =
  new ErrorClient(error);

  const statusCode: TStatusCode =
    errorClient.getStatus();

  const output: IExpressErrorOutput =
    errorClient.getOutput();

  res.status(statusCode).json(output);
}

export default errorMiddleware;
