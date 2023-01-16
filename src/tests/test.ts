import { server } from '../server/server.js';
import supertest from 'supertest';
import  request  from 'supertest'
import { expect } from 'chai';
import { IUser } from '../database/interfaceDB.js';

const serverApi = '/users';


describe('First suit', () => {

  it ('returned not users', async () => {
    const expected: IUser[] = [];
    const res = await supertest(server).get(serverApi);

    expect(res.statusCode).equal(200); 
    expect(res.body).to.equal(expected);
  });

  it ('added user', async () => {
    const expected: string = 'Sent a new user to the database';
    const res = await supertest(server)
    .post(serverApi)
    .send({userName: 'Loan', age: 49})
    .set('Accept', 'application/json');

    expect(res.statusCode).equal(201); 
    expect(res.body).to.equal(expected);
  });
})