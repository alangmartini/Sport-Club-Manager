import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service'
import * as jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';
import TokenClient from '../auth/TokenClient.auth';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.login = this.login.bind(this);

    this.userService = new UserService();
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    try {
      const user = { email, password };

      // If something is wrong, login service will throw an error
      const loggedUser = await this.userService.login(user);

      const tokenClient = new TokenClient();
      const payload = { userId: loggedUser.id};
      const token = tokenClient.generateToken(payload);

      res.status(StatusCodes.OK).json({ token });
    } catch(error) {
      next(error);
    }
  }
}