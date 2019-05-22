const getPermissions = require('./getPermissions');

const mockConnection = {
  _error: false,
  _results: [],
  _fields: [],
  query: function(query, callback){
    if (this._error!== false) {
      callback(this._error, [] /** returns empty */, this._fields);
      return;
    }
    callback(false, this._results, this._fields);
  }
};

describe('Test getPermissions', () => {

  test('It should return the permissions', async () => {
    const permission = { 
      "id": 120, 
      "name": "Rose Boutique",
      "favicon": "https://rose-boutique.com/images/favicon.ico",
      "domain":"rose-boutique.com",
      "storage": 1305,
      "createdAt": 'Sat May 18 2019 18:12:53',
      "permission": "administrator" 
    };
    mockConnection._results.push(permission);
    expect.assertions(1);
    await expect(getPermissions(mockConnection, '1qaz2wsx3edc4rfv')).resolves.toEqual([permission]);
  });

  test('It should return the result empty', async () => {
    mockConnection._results = [];
    expect.assertions(1);
    await expect(getPermissions(mockConnection, '1qaz2wsx3edc4rfv')).resolves.toEqual([]);
  });

  test('It should return an error', async () => {
    const mockError = {
      code: 'ER_ACCESS_DENIED_ERROR',
      sqlMessage: 'Access denied for user root@localhost (using password: root)'
    };
    mockConnection._results = [];
    mockConnection._error = mockError;
    expect.assertions(1);
    await expect(getPermissions(mockConnection, '1qaz2wsx3edc4rfv')).rejects.toThrow(new Error(mockError));
  });

});