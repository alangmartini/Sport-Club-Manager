import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.services';

// Created here because of 50 char long line limitation.
const ERROR = StatusCodes.INTERNAL_SERVER_ERROR;

export default class TeamsController {
  private TeamService;

  constructor() {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);

    this.TeamService = new TeamsService();
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const teams =
        await this.TeamService.findAll();

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
      const team = await this.TeamService.findById(id);

      res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  }
}
