import * as express from 'express';
import UserController from '../controllers/user.controller';
import ValidateEmailAndPassword from
  '../middlewares/validation/validateEmailAndPassword.middleware';
import ExistenceAssertEmailAndPassword from
  '../middlewares/existence/existenceEmailAndPassword.middleware';

const loginRoute = express.Router();
const userController = new UserController();
const userValidation = new ValidateEmailAndPassword();
const userExistenceAssert = new ExistenceAssertEmailAndPassword();

loginRoute.post(
  '/',
  userExistenceAssert.middleware,
  userValidation.middleware,
  userController.login,
);

export default loginRoute;
