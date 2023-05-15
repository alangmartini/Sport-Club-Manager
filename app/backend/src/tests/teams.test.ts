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
import errorsMock from './mocks/errors/errorsMock.mock';

// Models
import Teams from '../database/models/teams.model';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(()=>{
  sinon.restore();
})

describe('Teams findAll', () => {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    beforeEach(async () => {
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

    it('Should return internal error', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
      
      expect(chaiHttpResponse.body).to.deep.equal(errorsMock.badImplementationError);
      expect(chaiHttpResponse.status).to.equal(errorsMock.badImplementationError.statusCode);
    });
  })
});

describe('Teams findById', () => {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    it('Should return one team with correct id', async () => {
      sinon
      .stub(Teams, "findByPk")
      .resolves(teamsMock.ONE_TEAM as ITeam);

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');
      
      expect(chaiHttpResponse.body).to.deep.equal(teamsMock.ONE_TEAM);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });  
  })
  
  describe('Unsucceful returns', function () {
    it('Should return not found', async () => {
      sinon
      .stub(Teams, 'findByPk')
      .resolves(null)

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');
      
      expect(chaiHttpResponse.body).to.deep.equal(errorsMock.notFoundError);
      expect(chaiHttpResponse.status).to.equal(errorsMock.notFoundError.statusCode);
    });

    it('Should return internal error', async () => {
      sinon.stub(Teams, 'findByPk').callsFake(() => { throw new Error() });

      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');
      
      expect(chaiHttpResponse.body).to.deep.equal(errorsMock.badImplementationError);
      expect(chaiHttpResponse.status).to.equal(errorsMock.badImplementationError.statusCode);
    });
    
  })
});
