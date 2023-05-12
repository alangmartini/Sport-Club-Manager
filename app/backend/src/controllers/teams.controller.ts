import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IError from
                                 '../interfaces/error.interface';

// Created here because of 50 char long line limitation.
const ERROR = StatusCodes.INTERNAL_SERVER_ERROR;

export default class TeamController {
  private TeamService;

  constructor() {
    this.findAll = this.findAll.bind(this);

    this.TeamService = new TeamService();
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const teams = await this.TeamService
        .findAll();

      res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
