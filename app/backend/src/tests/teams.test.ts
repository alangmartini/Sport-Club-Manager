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
import errorsMock from './mocks/errors/badImplementation.mock';
// Models
import Teams from '../database/models/teams.model';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(()=>{
  sinon.restore();
})

describe('Tests teams endpoint', () => {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    before(async () => {
      sinon
        .stub(Teams, "findAll")
        .resolves(teamsMock.ALL_TEAMS as ITeam[]);
    });

    it('Should return all teams', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock.ALL_TEAMS);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });  
  })
  
  describe('Unsucceful returns', function () {
    beforeEach(() => {
      sinon
        .stub(Teams, 'findAll')
        .resolves([])
    });

    it('Should return itnernal error', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      
      expect(chaiHttpResponse.body).to.deep.equal(errorsMock.badImplementationError);
      expect(chaiHttpResponse.status).to.equal(errorsMock.badImplementationError.statusCode);
    });
  })
});
