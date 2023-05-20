// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Type
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/teams/teams.interface';

// Mocks
import teamsMock from './mocks/teams/teams.mock';
import errorsMock from './mocks/errors/httpErrors.mock';
import matchesMock from './mocks/matches/matches.mock';

// Models
import Matches from '../database/models/matches.model';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(()=>{
  sinon.restore();
})

describe('GET /matches', function () {
  let chaiHttpResponse: Response;
  describe('Succeful routes', function () {
    it('Should return all matches', function () {
      sinon.stub(Matches, 'findAll').resolves(matchesMock.allTeams);
    });
  })
  
});

describe('GET /matches with filters', function () {
  let chaiHttpResponse: Response;

});
describe('PATCH /matches/:id/finish', function () {
  let chaiHttpResponse: Response;

});
describe('PATCH /matches/:id', function () {
  let chaiHttpResponse: Response;

});
describe('POST /matches', function () {
  let chaiHttpResponse: Response;

});

