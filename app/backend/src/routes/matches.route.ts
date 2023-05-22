import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = express.Router();
const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.findAll);

export default matchesRoute;
