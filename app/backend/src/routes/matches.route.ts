import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import AuthToken from '../middlewares/auth/authToken.middleware';
import ExistenceToken from '../middlewares/existence/ExistenceToken.middleware';
import ExistenceUpdateBodyGoals from '../middlewares/existence/ExistencePatchGoalsBody.middleware';
import ExistenceNewMatch from '../middlewares/existence/ExistenceNewMatch.middleware';
import ValidateNewMatch from '../middlewares/validation/ValidateNewMatch.middleware';

const matchesRoute = express.Router();
const matchesController = new MatchesController();

const existenceToken = new ExistenceToken();
const authToken = new AuthToken();

// PATCH /matches/:id
const existenceUpdateBodyGoals = new ExistenceUpdateBodyGoals();

// POST /matches/:id
const existenceNewMatch = new ExistenceNewMatch();
const validateNewMatch = new ValidateNewMatch();

matchesRoute.get('/', matchesController.findAll);

matchesRoute.patch(
  '/:id/finish',
  existenceToken.middleware,
  authToken.middleware,
  matchesController.finishMatch,
);

matchesRoute.patch(
  '/:id',
  existenceToken.middleware,
  authToken.middleware,
  existenceUpdateBodyGoals.middleware,
  matchesController.updateGoals,
);

matchesRoute.post(
  '',
  existenceToken.middleware,
  authToken.middleware,
  existenceNewMatch.middleware,
  validateNewMatch.middleware,
  matchesController.createMatch,
);

export default matchesRoute;
