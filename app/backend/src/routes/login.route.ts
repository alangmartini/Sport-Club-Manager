import * as express from 'express';
import UserController from '../controllers/user.controller';
import validateEmailAndPassword from '../middlewares/validation/validateEmailAndPassword.middleware';

const loginRoute = express.Router();
const userController = new UserController();
const userValidation = new validateEmailAndPassword();

loginRoute.post('/',
  userValidation.middleware,
  userController.login);

export default loginRoute;