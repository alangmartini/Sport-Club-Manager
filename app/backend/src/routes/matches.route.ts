import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import AuthToken from '../middlewares/auth/authToken.middleware';
import ExistenceToken from '../middlewares/existence/existenceToken.middleware';

const matchesRoute = express.Router();
const matchesController = new MatchesController();
const existenceToken = new ExistenceToken();
const authToken = new AuthToken();

matchesRoute.get('/', matchesController.findAll);

matchesRoute.patch(
  '/:id/finish',
  existenceToken.middleware,
  authToken.middleware,
  matchesController.finishMatch,
);

export default matchesRoute;
