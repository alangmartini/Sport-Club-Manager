import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private teamService;

  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);

    this.teamService = new TeamsService();
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const teams = await this.teamService
        .findAll();

      res.status(StatusCodes.OK).json(teams);
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
      const team = await this.teamService.findById(id);

      res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  }
}
