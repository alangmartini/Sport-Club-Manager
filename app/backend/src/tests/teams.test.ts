// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Type
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/teams.interface';

// Mocks
import teamsMock from './mocks/teams/teams.mock';

// Models
import Teams from '../database/models/teams.model';

chai.use(chaiHttp);
const { expect } = chai;


describe('Tests teams endpoint', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock.ALL_TEAMS as ITeam[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('Should return all teams', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams');
    
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock.ALL_TEAMS);
    expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
  });
});
