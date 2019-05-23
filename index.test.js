const microservice = require('./index');

jest.mock('firebase-admin');
jest.mock('mysql');

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

  test('It should signup a new user', async () => {
    const firebaseUser = {
      token: '1qaz2wsx3edc4rfv',
      uid: '0okm9ijn8uhb',
    };
    const user = {
      id: '0okm9ijn8uhb',
      name: 'Anna',
      email: 'Ferris',
      phone: '+1 909 639 9053',
    };
    require('firebase-admin').__setMockUser(firebaseUser);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare ${firebaseUser.token}`;
    mocks.req.method = 'POST';
    mocks.req.body = user;
    //expect.assertions(1);
    await microservice.login(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(201);
  });

});