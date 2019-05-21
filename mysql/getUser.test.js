const getUser = require('./getUser');

class MockConnection {
  constructor() {
    this._error = false;
    this._results = [];
    this._fields = [];
  }
  
  query(query, callback) {
    if (this._error!== false) {
      callback(this._error, [] /** returns empty */, this._fields);
      return;
    }
    const found = query.indexOf(this._results[0].id)
    if (found !== -1) {
      callback(false, this._results, this._fields);
    } else {
      callback(false, [] /** returns empty */, this._fields);
    }
  }
};

describe('Test mysql/getUser', () => {

  test('It should find a user', async () => {
    const mockUser = {
      id: '1qaz2wsx3edc4rfv',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 647 1255'
    };
    let mockConnection = new MockConnection();
    mockConnection._results.push(mockUser);
    expect.assertions(1);
    await expect(getUser(mockConnection, mockUser.id)).resolves.toEqual(mockUser);
  });

  test('It shouldn\'t find a user', async () => {
    const mockUser = {
      id: '1qaz2wsx3edc4rfv',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 647 1255'
    };
    let mockConnection = new MockConnection();
    mockConnection._results.push(mockUser);
    expect.assertions(1);
    await expect(getUser(mockConnection, 'qwertyuiop')).resolves.toEqual(false);
  });

  test('It should return internal error', async () => {
    const mockUser = {
      id: '1qaz2wsx3edc4rfv',
      name: 'Anna',
      email: 'anna@',
      phone: '+1 909 647 1255'
    };
    const mockError = {
      code: 'ER_ACCESS_DENIED_ERROR',
      sqlMessage: 'Access denied for user root@localhost (using password: root)'
    };
    let mockConnection = new MockConnection();
    mockConnection._results.push(mockUser);
    mockConnection._error = mockError;
    expect.assertions(1);
    await expect(getUser(mockConnection, 'qwertyuiop')).rejects.toThrow(new Error(mockError));
  });

});