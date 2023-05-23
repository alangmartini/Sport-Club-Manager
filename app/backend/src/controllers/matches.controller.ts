import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';
import IUpdateGoalsBody from '../interfaces/matches/IUpdateGoalsBody.interface';

export default class MatchesController {
  private matchService;

  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.findAllByQuery = this.findAllByQuery.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.updateGoals = this.updateGoals.bind(this);

    this.matchService = new MatchesService();
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (Object.keys(req.query).length > 0) {
      return this.findAllByQuery(req, res, next);
    }

    try {
      const matches = await this.matchService
        .findAll();

      res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async findAllByQuery(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const matches = await this.matchService
        .findAllByQuery(req.query);

      res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const match = await this.matchService.findById(id);

      res.status(StatusCodes.OK).json(match);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      await this.matchService.finishMatch(id);

      res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateGoals(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const newGoals: IUpdateGoalsBody = req.body;
    const { id } = req.params;

    try {
      const updatedMatch = await this.matchService.updateGoals(id, newGoals);

      res.status(StatusCodes.OK).json({ updatedMatch });
    } catch (error) {
      next(error);
    }
  }
}
