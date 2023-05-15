// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Type
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/users/IUser.interface';

// Mocks
import authErrors from './mocks/errors/authErrorsMock.mock';
import errorsMock from './mocks/errors/errorsMock.mock';
import tokenMock from './mocks/users/token.mock';
import usersMock from './mocks/users/users.mock';

// Models
import Users from '../database/models/users.model';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe('Teams findAll', () => {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    beforeEach(async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(usersMock.USER as IUser);
    });

    it('Should return a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login')
        .send(usersMock.USER);

      expect(chaiHttpResponse.body).to.deep.equal(
        tokenMock.token,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.OK,
      );
    });
  });

  describe('Unsucceful returns', function () {
    it('Should return lacking email error', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login')
        .send({
          password: usersMock.VALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authNoEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.BAD_REQUEST,
      );
    });
    it('Should return lacking password error', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login')
        .send({ email: usersMock.VALID_EMAIL });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authNoEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.BAD_REQUEST,
      );
    });
    it('Should return invalid email error', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login')
        .send({
          email: usersMock.INVALID_EMAIL,
          password: usersMock.VALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authInvalidEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.UNAUTHORIZED,
      );
    });
    it('Should return invalid password error', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login')
        .send({
          email: usersMock.VALID_EMAIL,
          password: usersMock.INVALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authInvalidEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.UNAUTHORIZED,
      );
    });
  });
});
