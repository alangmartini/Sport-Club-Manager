import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService;

  constructor() {
    this.home = this.home.bind(this);

    this.leaderboardService = new LeaderboardService();
  }

  async home(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const leaderboard = await this.leaderboardService
        .findAll();

      res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
