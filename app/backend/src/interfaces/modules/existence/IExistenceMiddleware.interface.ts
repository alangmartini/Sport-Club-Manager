import { NextFunction, Request, Response } from 'express';
import IExistenceClient from './IExistenceClient.interface';
import IMiddleware from '../../IMiddleware.interface';

interface IExistenceMiddleware<T> extends IMiddleware{
  existenceClient: IExistenceClient<T>;
  object: T;
  typeOfError: string;

  middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}

export default IExistenceMiddleware;
