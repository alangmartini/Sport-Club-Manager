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
import bodyMock from './mocks/matches/body.mock';
import teamsMock from './mocks/teams/teams.mock';

// Models
import Matches from '../database/models/matches.model';
import { logIn } from './token.test';
import { ExistenceErrorMessages } from '../errors/existence/ExistenceErrorHandle.handle';
import ITeams from '../interfaces/teams/teams.interface';
import { ValidationError } from 'sequelize';

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
  describe('Succeful routes', async function () {
    it('Should finish a match', async function () {
      const mockMatch = matchesMock.matchWithId;
      const token = await logIn();

      ModelStub = sinon.stub(Matches, 'update').callsFake(async () => {
        mockMatch.inProgress = false;

        return [1];
      });

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('authorization', token.token);

      expect(mockMatch.inProgress).to.equal(false);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
  });
});

describe('PATCH /matches/:id', function () {
  let chaiHttpResponse: Response;
  let ModelStub: sinon.SinonStub;

  describe('Succeful routes', function () {
    it('Should update a match goals', async function () {
      const mockMatch = matchesMock.matchWithId;
      const goalsBody = {
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      };
      const updatedMockMatch = { ...mockMatch, ...goalsBody };

      /*
      'Any' is used here because sequelize update has a { returning: true } method
      where it returns the updated entity.
      But sinon.stub can't acess the updated type and ts don't have a better way
      to work around this situation.
    */
      ModelStub = sinon.stub(Matches, 'update').callsFake(async (): Promise<any> => {
        mockMatch.homeTeamGoals = goalsBody.homeTeamGoals;
        mockMatch.awayTeamGoals = goalsBody.awayTeamGoals;

        return [1, [updatedMockMatch]];
      });

      const token = await logIn();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', token.token)
        .send(goalsBody);

      expect(chaiHttpResponse.body).to.deep.equal({ updatedMatch: updatedMockMatch });
      expect(chaiHttpResponse.status).to.equal(StatusCodes.OK);
    });
  });

  describe('Unsucceful routes', function () {
    it('When no body is given, should return a error', async function () {
      const token = await logIn();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', token.token);

      expect(chaiHttpResponse.body).to.deep.equal({
        message: ExistenceErrorMessages.noGoalsBody.output.message,
      });
      expect(chaiHttpResponse.status).to.equal(ExistenceErrorMessages.noGoalsBody.status);
    });

    it('When a empty body is given, should return a error', async function () {
      const token = await logIn();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .set('authorization', token.token)
        .send({});

      expect(chaiHttpResponse.body).to.deep.equal({
        message: ExistenceErrorMessages.noGoalsBody.output.message,
      });
      expect(chaiHttpResponse.status).to.equal(ExistenceErrorMessages.noGoalsBody.status);
    });
  });
});

describe('POST /matches', function () {
  let chaiHttpResponse: Response;
  let ModelStub: sinon.SinonStub;

  describe('Succeful routes', function () {
    it('Should create a match goals', async function() {
    const mockCreatedMatch = matchesMock.matchWithId;
    
    ModelStub = sinon.stub(Matches, 'create').resolves(mockCreatedMatch as IMatch);

    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token.token)
      .send(bodyMock.postMatchBody);

    expect(chaiHttpResponse.body).to.deep.equal(mockCreatedMatch);
    expect(chaiHttpResponse.status).to.equal(StatusCodes.CREATED)
    });
  });

  describe('Unsucceful routes', function () {
    it('When no body is given, should return a error', async function() {

    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token.token)
    
    expect(chaiHttpResponse.body).to.deep.equal({ message: ExistenceErrorMessages.noMatchCreateBody.output.message });
    expect(chaiHttpResponse.status).to.equal(ExistenceErrorMessages.noMatchCreateBody.status)
    });

    it('When a match have two equal teams, should return a error', async function() {
    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token.token)
      .send(bodyMock.postMatchBodySameTeam)

      expect(chaiHttpResponse.body).to.deep.equal({ message: validationErrorMessages.sameTeam.output.message });
      expect(chaiHttpResponse.status).to.equal(validationErrorMessages.sameTeam.status)
    });
    it('When a body ave a non existent team, should return a error', async function() {
    sinon.stub(Matches, 'findByPk')
      .onCall(0).resolves(null)
      .onCall(1).resolves(teamsMock.SECOND_TEAM as ITeams)

    const token = await logIn();

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token.token)
      .send(bodyMock.postMatchBodyNonExistentTeam)

      expect(chaiHttpResponse.body).to.deep.equal({ message: businessErrorMessages.noGoalsBody.output.message });
      expect(chaiHttpResponse.status).to.equal(businessErrorMessages.noGoalsBody.status)
    });
  })
});
