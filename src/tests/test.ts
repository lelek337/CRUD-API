import { expect } from 'chai';
import { server } from '../server/server.js';
import supertest from 'supertest';
import { IUser } from '../database/interfaceDB.js';

const API = 'http://localhost:3000/'

describe('First suit', () => {

  it ('returned not users', async () => {
    const expected: IUser[] = [];
    const res = await supertest(server).get(API);

    expect(res.body).equal(expected);
    expect(res.statusCode).equal(200); 
  })
})