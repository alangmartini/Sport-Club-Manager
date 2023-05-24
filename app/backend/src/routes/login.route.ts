import * as express from 'express';
import UserController from '../controllers/user.controller';
import ValidateEmailAndPassword from
  '../middlewares/validation/ValidateEmailAndPassword.middleware';
import ExistenceEmailAndPassword from
  '../middlewares/existence/ExistenceEmailAndPassword.middleware';
import ExistenceToken from '../middlewares/existence/ExistenceToken.middleware';
import AuthToken from '../middlewares/auth/authToken.middleware';

const loginRoute = express.Router();

const userController = new UserController();
const userExistenceAssert = new ExistenceEmailAndPassword();
const userValidation = new ValidateEmailAndPassword();

const tokenExistenceAssert = new ExistenceToken();
const tokenAuth = new AuthToken();

loginRoute.post(
  '/',
  userExistenceAssert.middleware,
  userValidation.middleware,
  userController.login,
);

loginRoute.get(
  '/role',
  tokenExistenceAssert.middleware,
  tokenAuth.middleware,
  userController.role,
);

export default loginRoute;
