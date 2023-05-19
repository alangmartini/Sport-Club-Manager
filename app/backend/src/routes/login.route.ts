import * as express from 'express';
import UserController from '../controllers/user.controller';
import ValidateEmailAndPassword from
  '../middlewares/validation/validateEmailAndPassword.middleware';
import ExistenceEmailAndPassword from
  '../middlewares/existence/existenceEmailAndPassword.middleware';
import ExistenceToken from '../middlewares/existence/existenceToken.middleware';

const loginRoute = express.Router();

const userController = new UserController();
const userExistenceAssert = new ExistenceEmailAndPassword();
const userValidation = new ValidateEmailAndPassword();

const tokenExistenceAssert = new ExistenceToken();

loginRoute.post(
  '/',
  userExistenceAssert.middleware,
  userValidation.middleware,
  userController.login,
);

loginRoute.get(
  '/role',
  tokenExistenceAssert.middleware,
);

export default loginRoute;
