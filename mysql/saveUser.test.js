const saveUser = require('./saveUser');

class MockConnection {
  constructor() {
    this._error = false;
    this._results = {};
    this._fields = [];
  }
  
  query(query, callback) {
    if (this._error!== false) {
      callback(this._error, [] /** returns empty */, this._fields);
      return;
    }
    callback(false, this._results, this._fields);
  }
};

describe('Test saveUser', () => {

  test('It should save the user', async () => {
    const user = {
      id: '1qaz2wsx3edc4rfv5tgb',
      name: 'Anna', 
      email: 'Ferris',
      phone: '+1 909 595 2399'
    };
    let mockConnection = new MockConnection();
    expect.assertions(1);
    await expect(saveUser(mockConnection, user.id, user.name, user.email, user.phone)).resolves.toEqual(true);
  });

  test('It should get an error', async () => {
    const user = {
      id: '_1qaz2wsx3edc4rfv5tgb',
      name: 'Anna', 
      email: 'Ferris',
      phone: '+1 909 595 2399'
    };
    const mockError = {
      code: 'ER_ACCESS_DENIED_ERROR',
      sqlMessage: 'Access denied for user root@localhost (using password: root)'
    };
    let mockConnection = new MockConnection();
    mockConnection._error = mockError;
    expect.assertions(1);
    await expect(saveUser(mockConnection, user.id, user.name, user.email, user.phone)).rejects.toThrow(new Error(mockError));
  });

});