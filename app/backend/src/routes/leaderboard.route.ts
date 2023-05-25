import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import ExistenceToken from '../middlewares/existence/ExistenceToken.middleware';
// import AuthToken from '../middlewares/auth/authToken.middleware';

const leaderboardRoute = express.Router();

const leaderboardController = new LeaderboardController();

// const tokenExistenceAssert = new ExistenceToken();
// const tokenAuth = new AuthToken();

leaderboardRoute.get(
  '/home',
  leaderboardController.home,
);

// leaderboardRoute.get(
//   '/role',
//   tokenExistenceAssert.middleware,
//   tokenAuth.middleware,
// );

export default leaderboardRoute;
