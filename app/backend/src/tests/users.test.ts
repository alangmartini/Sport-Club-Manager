// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import * as bcrypt from 'bcryptjs';

// Type
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/users/IUser.interface';

// Mocks
import authErrors from './mocks/errors/authErrorsMock.mock';
import errorsMock from './mocks/errors/errorsMock.mock';
import tokenMock from './mocks/users/token.mock';
import usersMock from './mocks/users/users.mock';

// Class
import Users from '../database/models/users.model';
import HashClient from '../modules/auth/HashClient.client';


chai.use(chaiHttp);
const { expect } = chai;
const hashClient = new HashClient();

afterEach(() => {
  sinon.restore();
});

describe('User login', () => {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    beforeEach(async () => {
      const hashedPassword =
        await hashClient.hashPassword(
          usersMock.USER.password,
        );
    
      sinon.stub(Users, 'findOne').resolves({
        ...usersMock.USER,
        password: hashedPassword,
      } as IUser);
    });

    it('Should return a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: usersMock.VALID_EMAIL,
          password: usersMock.VALID_PASSWORD
        });

        expect(
          'token' in chaiHttpResponse.body,
        ).to.be.equal(true);

      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.OK,
      );
    });
  });

  describe('Unsucceful returns', function () {
    it('Should return wrong password error', async () => {
      sinon.stub(bcrypt, 'compare').resolves(false);
  
      sinon.stub(Users, 'findOne').resolves({
        ...usersMock.USER,
        password: 'hmmmmmmmmm',
      } as IUser);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: usersMock.VALID_EMAIL,
          password: usersMock.VALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authInvalidEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.UNAUTHORIZED,
      );
    });

    it('Should return not found error', async () => {
      sinon.stub(Users, 'findOne').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: usersMock.VALID_EMAIL,
          password: usersMock.VALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        errorsMock.notFoundError,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.NOT_FOUND,
      );
    });

    it('Should return lacking email error', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
        .post('/login')
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
