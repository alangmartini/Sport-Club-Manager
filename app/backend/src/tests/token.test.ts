// @ts-ignore
// Framework
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

// Types and Interfaces
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/teams/teams.interface';
import IreqResToken from '../interfaces/requisitionsResponses/token.interface';

// Mocks
import teamsMock from './mocks/teams/teams.mock';
import errorsMock from './mocks/errors/errorsMock.mock';

// Models
import Teams from '../database/models/teams.model';
import ExistenceClient from '../modules/existence/ExistenceClient.client';
import HashClient from '../modules/auth/HashClient.client';
import usersMock from './mocks/users/users.mock';
import Users from '../database/models/users.model';
import IUser from '../interfaces/users/IUser.interface';

chai.use(chaiHttp);
const { expect } = chai;

afterEach(()=>{
  sinon.restore();
})

const hashClient = new HashClient();

let chaiLoginHttpResponse: Response;

async function logIn (): Promise<IreqResToken> {
  // Mocks
  const hashedPassword = await hashClient.generateHash(
    usersMock.USER.password
  );

  const usersFindOneStub = sinon.stub(Users, 'findOne');  
  usersFindOneStub.resolves({
    ...usersMock.USER,
    password: hashedPassword
  } as IUser);

  chaiLoginHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: usersMock.VALID_EMAIL,
      hashedPassword: usersMock.VALID_PASSWORD
  });

return chaiLoginHttpResponse.body;
}

describe("Token autentication", function () {
  let chaiHttpResponse: Response;

  describe("Succeful returns", function () {
    it("After logging and getting a token, should have access normally", function () {
      // Log in and get token
      // Try a route

    });
  });
});
