// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Type
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import IMatch from '../interfaces/matches/IMatch.interface';

// Mocks
import matchesMock from './mocks/matches/matches.mock';

// Models
import Matches from '../database/models/matches.model';
import { logIn } from './token.test';
import { ErrorMessages } from '../errors/existence/ExistenceErrorHandle.handle';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe('GET /matches', function () {
  let chaiHttpResponse: Response;
  describe('Succeful routes', async function () {
    it('Should return all matches', async function () {
      sinon.stub(Matches, 'findAll').resolves(matchesMock.allTeams as Array<IMatch>);
    });

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body).to.deep.equal(matchesMock.allTeams);
    expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
  });
});

describe('GET /matches with filters', function () {
  let chaiHttpResponse: Response;
  describe('Succeful routes', async function () {
    it('matches with Progress True', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesMock.filteredTeamsProgressTrue as Array<IMatch>);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse.body).to.deep.equal(matchesMock.filteredTeamsProgressTrue);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
    it('matches with Progress False', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesMock.filteredTeamsProgressFalse as Array<IMatch>);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse.body).to.deep.equal(matchesMock.filteredTeamsProgressFalse);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
    it('matches with Home Team Sao Paulo', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesMock.filteredTeamsHomeTeamSaoPaulo as Array<IMatch>);

      chaiHttpResponse = await chai.request(app).get('/matches?homeTeam=Sao%20Paulo');
      console.log('chaiHttpResponse is:', chaiHttpResponse.body);

      expect(chaiHttpResponse.body).to.deep.equal(matchesMock.filteredTeamsHomeTeamSaoPaulo);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
    it('matches with Away Team Internacional', async function () {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesMock.filteredTeamsAwayTeamInternacional as Array<IMatch>);

      chaiHttpResponse = await chai.request(app).get('/matches?awayTeam=Internacional');

      expect(chaiHttpResponse.body).to.deep.equal(matchesMock.filteredTeamsAwayTeamInternacional);
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
  });
});

describe('PATCH /matches/:id/finish', function () {
  let chaiHttpResponse: Response;
  let ModelStub: sinon.SinonStub;

  describe('Succeful routes', function () {
    it('Should finish a match', async function() {
    const mockMatch = matchesMock.matchWithId;
    const token = await logIn();

    ModelStub = sinon.stub(Matches, 'update').callsFake(async () => {
      mockMatch.inProgress = false;

      return [1];
    });

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', token.token)

    expect(mockMatch.inProgress).to.equal(false);
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "Finished" });
    expect(chaiHttpResponse.status).to.equal(StatusCodes.OK)
    });
  })
});

describe.only('PATCH /matches/:id', function () {
  let chaiHttpResponse: Response;
  let ModelStub: sinon.SinonStub;

  describe('Succeful routes', function () {
    it('Should update a match goals', async function() {
    const mockMatch = matchesMock.matchWithId;
    const goalsBody = {
      homeTeamGoals: 3,
      awayTeamGoals: 1,
    }
    const updatedMockMatch = { ...mockMatch, ...goalsBody };
    ModelStub = sinon.stub(Matches, 'update').callsFake(async () => {
      mockMatch.homeTeamGoals = goalsBody.homeTeamGoals;
      mockMatch.awayTeamGoals = goalsBody.awayTeamGoals;

      return [1];
    });


    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', token.token)
      .send(goalsBody);

    
    expect(chaiHttpResponse.body).to.deep.equal({ updatedMatch: updatedMockMatch });
    expect(chaiHttpResponse.status).to.equal(StatusCodes.OK)
    });
  });

  describe('Unsucceful routes', function () {
    it('When no body is given, should return a error', async function() {
    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', token.token)

    expect(chaiHttpResponse.body).to.deep.equal(ErrorMessages.noGoalsBody);
    expect(chaiHttpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
    });

    it('When a empty body is given, should return a error', async function() {
    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', token.token)
      .send({})

    expect(chaiHttpResponse.body).to.deep.equal(ErrorMessages.noGoalsBody);
    expect(chaiHttpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
    });
  })
});

describe('POST /matches', function () {
  let chaiHttpResponse: Response;
});
