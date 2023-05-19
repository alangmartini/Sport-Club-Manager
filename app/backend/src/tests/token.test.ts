// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Types and Interfaces
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import IreqResToken from '../interfaces/requisitionsResponses/token.interface';
import IUser from '../interfaces/users/IUser.interface';
import IUserBody from '../interfaces/users/IUserBody.interface';

// Mocks
import usersMock from './mocks/users/users.mock';
import rolesMock from './mocks/users/role.mock';
import authErrorsMock from './mocks/errors/authErrors.mock';

// Models and Clients
import HashClient from '../modules/auth/HashClient.client';
import Users from '../database/models/users.model';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

const hashClient = new HashClient();

let chaiLoginHttpResponse: Response;
let usersFindOneStub: any;

async function logIn(): Promise<IreqResToken> {
  // Mocks
  const hashedPassword = await hashClient.generateHash(usersMock.USER.password);

  usersFindOneStub = sinon.stub(Users, 'findOne');

  usersFindOneStub.resolves({
    ...usersMock.USER,
    password: hashedPassword,
  } as IUser);

  const userBody = {
    email: usersMock.VALID_EMAIL,
    password: usersMock.VALID_PASSWORD,
  } as IUserBody;

  chaiLoginHttpResponse = await chai.request(app).post('/login').send(userBody);

  return chaiLoginHttpResponse.body;
}

describe.only('Token autentication', function () {
  let chaiHttpResponse: Response;

  describe('Succeful returns', function () {
    it('After logging and getting a token, should have access normally', async function () {
      const tokenObj: IreqResToken = await logIn();

      // Try a route
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${tokenObj.token}`);

      expect(chaiHttpResponse.body).to.deep.equal(rolesMock.userRole);
    });
  });

  describe('Unsucceful returns', function () {
    it('When no token, should return Token Not Found', async function () {
      chaiHttpResponse = await chai.request(app).get('/login/role');

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrorsMock.authTokenNotFound
      );

      expect(chaiHttpResponse.status).to.equal(StatusCodes.UNAUTHORIZED);
    });

    it('When invalid token, should return Token must be a valid token', async function () {
      chaiHttpResponse = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'notcoolautorization');

      expect(chaiHttpResponse.body).to.deep.equal(
        authErrorsMock.tokenNotValid
      );

      expect(chaiHttpResponse.status).to.equal(StatusCodes.UNAUTHORIZED);
    });
  });
});
