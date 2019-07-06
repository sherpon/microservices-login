//"use strict";
require('./tools/getEnv')();

const getToken = require('./tools/getToken');
const getFirebase = require('./firebase/getFirebase');
const getUserByToken = require('./firebase/getUserByToken');
const getFirestore = require('./db/getFirestore');
const getUser = require('./db/getUser');
const saveUser = require('./db/saveUser');
const getPermissions = require('./db/getPermissions');

let firebase;
let firestore;

const getUserStep = async (req, res) => {
  try {
    const user = req.body;
    firestore = getFirestore(firestore);
    const dbUser = await getUser(firestore, user.id);
    if (dbUser === false /** user doesn't exist */) {
      await saveUser(firestore, user.id, user.name, user.email, user.phone);
      res.status(201);
      res.end();  // return 201 Created
    } else {
      /** user exist */
      const permissions = await getPermissions(firestore, user.id);
      const session = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone,
        paymentProcessor: dbUser.paymentProcessor,
        websites: permissions
      };
      res.status(202);
      res.send(session);  // return 202 accepted
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

const getAuthorizationStep = async (req, res) => {
  try {
    // get user information
    const user = req.body;
    const myToken = req.userToken;
    firebase = getFirebase(firebase);
    const uid = await getUserByToken(firebase, myToken);
    if (user.id!==uid) {
      // must be the same
      res.status(401);
      res.end();  // send no content
    } else {
      await getUserStep(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

const getTokenStep = async (req, res) => {
  const myAuthentication = getToken(req.headers);
  if (myAuthentication===false) {
    // didn't find any token
    res.status(401);
    res.end();  // send no content
  } else {
    // populate it
    req.userToken = myAuthentication.token;
    await getAuthorizationStep(req, res);
  }
};

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.login = async (req, res) => {

  // Set CORS headers for preflight requests
  res.set('Access-Control-Allow-Origin', process.env.ADMIN_APP_URL);
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204)
    res.send('');
  } else {
    await getTokenStep(req, res);
  }
};