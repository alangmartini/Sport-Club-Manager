import { NextFunction, Request, Response } from 'express';
import EnumExistenceError from '../../enums/ExistenceError.enum';
import INewMatchBody from '../../interfaces/matches/INewMatchBody.interface';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import IExistenceMiddleware
  from '../../interfaces/modules/existence/IExistenceMiddleware.interface';
import ExistenceClient from '../../modules/existence/ExistenceClient.client';

class ExistenceNewMatch implements IExistenceMiddleware<INewMatchBody> {
  existenceClient: ExistenceClient<INewMatchBody>;

  object = {
    homeTeamId: 16,
    awayTeamId: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
  };

  typeOfError = EnumExistenceError.NO_NEW_MATCH_BODY;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.existenceClient = new ExistenceClient(this.object, this.typeOfError);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    const newMatch: INewMatchBody = req.body;
    try {
      const result: TValidateResult = this.existenceClient.assertExist(newMatch);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default ExistenceNewMatch;
