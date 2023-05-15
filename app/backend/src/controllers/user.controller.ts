import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service'
import * as jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';

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

      const payload = { userId: loggedUser.id};
      const secret = process.env.JWT_SECRET || 'secret';
      const token = jwt.sign(payload, secret);
      console.log('token is:', token);
      

      res.status(StatusCodes.OK).json({ token });
    } catch(error) {
      next(error);
    }
  }
}