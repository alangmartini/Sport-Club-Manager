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
import usersMock from './mocks/users/users.mock'

// Models
import Users from '../database/models/users.model';

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
        .stub(Users, "findOne")
        .resolves(usersMock.USER as IUser);
    });

    it('Should return a token', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/login');
      
      expect(chaiHttpResponse.body).to.deep.equal(tokenMock.token);
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
