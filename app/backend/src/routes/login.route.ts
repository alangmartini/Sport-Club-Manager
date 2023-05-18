import * as express from 'express';
import UserController from '../controllers/user.controller';
import validateEmailAndPassword from '../middlewares/validation/validateEmailAndPassword.middleware';
import existenceAssertEmailAndPassword from '../middlewares/existence/existenceEmailAndPassword.middleware';

const loginRoute = express.Router();
const userController = new UserController();
const userValidation = new validateEmailAndPassword();
const userExistenceAssert = new existenceAssertEmailAndPassword();

loginRoute.post('/',
  userExistenceAssert.middleware,
  userValidation.middleware,
  userController.login
);

export default loginRoute;