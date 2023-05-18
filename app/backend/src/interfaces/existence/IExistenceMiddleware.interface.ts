import { NextFunction, Request, Response } from 'express';
import IExistenceClient from './IExistenceClient.interface';

interface IExistenceMiddleware<T> {
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
