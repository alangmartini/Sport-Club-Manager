import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import AuthToken from '../middlewares/auth/authToken.middleware';
import ExistenceToken from '../middlewares/existence/existenceToken.middleware';
import ExistenceUpdateBodyGoals from '../middlewares/existence/existencePatchGoalsBody.middleware';

const matchesRoute = express.Router();
const matchesController = new MatchesController();

const existenceToken = new ExistenceToken();
const authToken = new AuthToken();

const existenceUpdateBodyGoals = new ExistenceUpdateBodyGoals();

matchesRoute.get('/', matchesController.findAll);

matchesRoute.patch(
  '/:id/finish',
  existenceToken.middleware,
  authToken.middleware,
  matchesController.finishMatch,
);

matchesRoute.patch(
  '/:id',
  existenceUpdateBodyGoals.middleware,
  matchesController.updateGoals,
);

export default matchesRoute;
