import { Request, Response, NextFunction } from 'express';

interface IMiddleware {
  middleware(
    req: Request,
    res: Response,
    next: NextFunction): void;
}

export default IMiddleware;
