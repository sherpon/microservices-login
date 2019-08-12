const getEnv = require('../tools/getEnv');

jest.mock('firebase-admin');

const getUserbyToken = require('./getUserByToken');

describe('Test getUserbyToken', () => {
  const firebaseUser = {
    token: '1qaz2wsx3edc4rfv5tgb',
    uid: 'zxcvbnmlkjhgfdsa'
  };

  beforeEach(() => {
    getEnv();
    require('firebase-admin').__setMockUser(firebaseUser);
  });

  test('It should get the user.', async () => {
    const firebase = require('firebase-admin');
    expect.assertions(2);
    expect(process.env.SHERPON_ENV).toBe('test');
    await expect(getUserbyToken(firebase, firebaseUser.token)).resolves.toEqual(firebaseUser.uid);
  });

  test('It should get the user. Production env', async () => {
    const firebase = require('firebase-admin');
    delete process.env.SHERPON_ENV;
    expect.assertions(2);
    expect(process.env.SHERPON_ENV).toBe(undefined);
    await expect(getUserbyToken(firebase, firebaseUser.token)).resolves.toEqual(firebaseUser.uid);
  });

  test('It shouldn\'t get the user.', async () => {
    const firebase = require('firebase-admin');
    expect.assertions(1);
    await expect(getUserbyToken(firebase, 'asdfgsg')).rejects.toThrow('error: the token doesn\'t exist.');
  });

  test('It should return an error because there isn\'t a valid token.', async () => {
    const firebase = require('firebase-admin');
    expect.assertions(1);
    await expect(getUserbyToken(firebase, undefined)).rejects.toThrow('error: token is undefined');
  });

  test('It should return an error because there isn\'t a empty token.', async () => {
    const firebase = require('firebase-admin');
    expect.assertions(1);
    await expect(getUserbyToken(firebase, '')).rejects.toThrow('error: token is empty');
  });

});