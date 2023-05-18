import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const teamRoute = express.Router();
const teamController = new TeamsController();

teamRoute.get('/', teamController.findAll);
teamRoute.get('/:id', teamController.findById);

export default teamRoute;
