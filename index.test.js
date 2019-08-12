process.env.SHERPON_ENV = 'test';

const microservice = require('./index');

jest.mock('firebase-admin');
jest.mock('@google-cloud/firestore');

const getMocks = () => {
  let __mockReq = {
    headers: {},
    get: function(header) {
      return this.headers[header];
    },
    method: '',
    body: {},
    query: {},
    params: {},
  };

  let __mockRes = {
    set: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
    status: jest.fn(),
  };

  return {
    req: __mockReq,
    res: __mockRes,
  };
};

describe('Test login', () => {

  test('It should signup a new user and return status 201', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '0okm9ijn8uhb',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 639 9053',
    };
    const mockResultArray = [
      { // getUser
        exists: false,
      },
    ];
    require('firebase-admin').__setMockUser(firebaseUser);
    require('@google-cloud/firestore').__setMockResultArray(mockResultArray);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare ${firebaseUser.token}`;
    mocks.req.method = 'POST';
    mocks.req.body = user;
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(201);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  });

  /*test('It should login the user and return status 202 with the permissions', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '0okm9ijn8uhb',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 639 9053',
    };
    const mysqlUser = [{
      id: '0okm9ijn8uhb',
      name: 'Anna Ferris',
      email: 'anna@',
      phone: '+1 909 639 9053',
    }];
    const mysqlResults = [
      { 
        "id": 120, 
        "name": "Rose Boutique",
        "favicon": "https://rose-boutique.com/images/favicon.ico",
        "domain":"rose-boutique.com",
        "storage": 1305,
        "createdAt": "Sat May 18 2019 18:12:53 GMT-0500",
        "permission": "administrator" 
      }
    ]
    require('firebase-admin').__setMockUser(firebaseUser);
    require('mysql').__setMockResultsUsers(mysqlUser);
    require('mysql').__setMockResultsPermissions(mysqlResults);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare ${firebaseUser.token}`;
    mocks.req.method = 'POST';
    mocks.req.body = user;
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(202);
    expect(mocks.res.send.mock.calls.length).toBe(1);
    expect(mocks.res.send.mock.calls[0][0].name).toBe(mysqlUser[0].name);
  });*/

  /*test('It should fail. Because there isnt any token', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '0okm9ijn8uhb',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 639 9053',
    };
    require('firebase-admin').__setMockUser(firebaseUser);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare `;
    mocks.req.method = 'POST';
    mocks.req.body = user;
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(401);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  });*/

  /*test('It should fail. Because there isnt any authorization header', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '0okm9ijn8uhb',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 639 9053',
    };
    require('firebase-admin').__setMockUser(firebaseUser);
    let mocks = getMocks();
    mocks.req.method = 'POST';
    mocks.req.body = user;
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(401);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  });*/

  /*test('It should fail. Because the uid and the token uid are different', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '_0okm9ijn8uhb',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 639 9053',
    };
    require('firebase-admin').__setMockUser(firebaseUser);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare ${firebaseUser.token}`;
    mocks.req.method = 'POST';
    mocks.req.body = user;
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(401);
    expect(mocks.res.end.mock.calls.length).toBe(1);
  });*/

});