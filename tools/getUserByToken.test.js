const getEnv = require('./getEnv');

jest.mock('fs');

const getUserbyToken = require('./getUserByToken');

describe('Test getUserbyToken', () => {
  const validToken = '1qaz2wsx3edc4rfv5tgb';

  beforeEach(() => {
    getEnv();
  });

  test('It should get the user.', async () => {
    expect.assertions(2);
    expect(process.env.SHERPON_ENV).toBe('DEVELOPMENT');
    await expect(getUserbyToken(validToken)).resolves.toEqual('1qw23er45ty67ui8');
  });

  test('It should get the user. Production env', async () => {
    delete process.env.SHERPON_ENV;
    expect.assertions(2);
    expect(process.env.SHERPON_ENV).toBe(undefined);
    await expect(getUserbyToken(validToken)).resolves.toEqual('1qw23er45ty67ui8');
  });

  test('It shouldn\'t get the user.', async () => {
    expect.assertions(1);
    await expect(getUserbyToken('asdfgsg')).rejects.toThrow('error: the token doesn\'t exist.');
  });

  test('It should return an error because there isn\'t a valid token.', async () => {
    expect.assertions(1);
    await expect(getUserbyToken()).rejects.toThrow('error: token is undefined');
  });

  test('It should return an error because there isn\'t a empty token.', async () => {
    expect.assertions(1);
    await expect(getUserbyToken('')).rejects.toThrow('error: token is empty');
  });

});