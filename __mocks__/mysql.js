/**
 * https://jestjs.io/docs/en/manual-mocks
 */

const mysql = jest.genMockFromModule('mysql');

let __mockError = false;
let __mockResults = [];
let __mockFields = [];

const __setMockError = (newError) => {
  __mockError = newError;
};
const __setMockResults = (newResults) => {
  __mockResults = newResults;
};
const __setMockFields = (newFields) => {
  __mockFields = newFields;
};
mysql.__setMockError = __setMockError;
mysql.__setMockResults = __setMockResults;
mysql.__setMockFields = __setMockFields;

const query = (sql, callback) => {
  if (__mockError!== false) {
    callback(__mockError, [] /** returns empty */, [] /** returns empty */);
    return;
  }
  callback(false, __mockResults, __mockFields);
};

const connection = {
  connect: () => {},
  query: query,
  end: () => {},
};
const createConnection = () => connection;
mysql.createConnection = createConnection;
module.exports = mysql;