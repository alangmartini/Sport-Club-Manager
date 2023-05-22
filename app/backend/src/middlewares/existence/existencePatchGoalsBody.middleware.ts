import { NextFunction, Request, Response } from 'express';
import IExistenceMiddleware from
  '../../interfaces/modules/existence/IExistenceMiddleware.interface';
import EnumExistenceError from '../../enums/ExistenceError.enum';
import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import ExistenceClient from '../../modules/existence/ExistenceClient.client';
import IUpdateGoalsBody from '../../interfaces/matches/IUpdateGoalsBody.interface';

class ExistenceUpdateBodyGoals implements IExistenceMiddleware<IUpdateGoalsBody> {
  existenceClient: ExistenceClient<IUpdateGoalsBody>;
  // Object is used to validate if the incoming body has the same props
  object = {
    homeTeamGoals: 3,
    awayTeamGoals: 1,
  };

  typeOfError = EnumExistenceError.NO_GOALS_BODY;

  constructor() {
    this.middleware = this.middleware.bind(this);

    this.existenceClient = new ExistenceClient(this.object, this.typeOfError);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    const matchScore = req.body;

    try {
      const result: TValidateResult = this.existenceClient.assertExist(matchScore);

      if (result instanceof BasedError) {
        throw result;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

export default ExistenceUpdateBodyGoals;
