const getEnv = require('./getEnv');

describe('Test getEnv', () => {

  test('It should return process.env.SHERPON_ENV undefined', () => {
    expect(process.env.SHERPON_ENV).toBe('test');
  });

  test('It should return process.env.SHERPON_ENV DEVELOPMENT', () => {
    getEnv();
    expect(process.env.SHERPON_ENV).toBe('test');
  });

});