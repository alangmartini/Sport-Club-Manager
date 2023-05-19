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
import usersMock from './mocks/users/users.mock';

// Class
import Users from '../database/models/users.model';
import HashClient from '../modules/auth/HashClient.client';


chai.use(chaiHttp);
const { expect } = chai;
const hashClient = new HashClient();

afterEach(function () {
  sinon.restore();
});

describe('User login', function () {
  let chaiHttpResponse: Response;

  describe('Successful returns', function () {
    beforeEach(async function () {
      const hashedPassword =
        await hashClient.generateHash(
          usersMock.USER.password,
        );
    
      sinon.stub(Users, 'findOne').resolves({
        ...usersMock.USER,
        password: hashedPassword,
      } as IUser);
    });

    it('Should return a token', async function () {
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
    it('When wrong password, should return Invalid email or password', async function () {
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

    it('When account with email not found, should return Invalid email or password', async function () {
      sinon.stub(Users, 'findOne').resolves(null);

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

    it('When no email, should return All fields must be filled', async function () {
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

    it('When no password, should return All fields must be filled', async function () {
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

    it('When empty email, should return All fields must be filled', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "",
          password: usersMock.VALID_PASSWORD,
        });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authNoEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.BAD_REQUEST,
      );
    });

    it('When empty password, should return All fields must be filled', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: usersMock.VALID_EMAIL, password: "" });

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrors.authNoEmailOrPass,
      );
      expect(chaiHttpResponse.status).to.equal(
        StatusCodes.BAD_REQUEST,
      );
    });

    it('When invalid email, should return All fields must be filled', async function () {
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

    it('When invalid password, should return All fields must be filled', async function () {
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
