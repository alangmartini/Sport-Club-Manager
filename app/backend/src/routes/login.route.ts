import * as express from 'express';
import UserController from '../controllers/user.controller';

const loginRoute = express.Router();
const userController = new UserController();

loginRoute.post('/', userController.login);

export default loginRoute;