//"use strict";

const getEnv = require('./tools/getEnv');
const getToken = require('./tools/getToken');
const getUserByToken = require('./tools/getUserByToken');
const getConnection = require('./mysql/getConnection');
const getUser = require('./mysql/getUser');
const saveUser = require('./mysql/saveUser');
const getPermissions = require('./mysql/getPermissions');

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
  // Get env variables
  getEnv();

  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  res.set('Access-Control-Allow-Origin', '*');

  // get user information
  const user = req.body;
  
  const myAuthentication = getToken(req.headers);
  if (myAuthentication===false) {
    // didn't find any token
    res.status(401).end();  // send no content
  }

  const myToken = myAuthentication.token;
  try {
    const uid = await getUserByToken(myToken);
    if (user.id!==uid) {
      // must be the same
      res.status(401).end();  // send no content
    }
    const connection = getConnection();
    connection.connect();
    const dbUser = await getUser(connection, uid);
    if (dbUser === false /** user doesn't exist */) {
      await saveUser(connection, user.id, user.name, user.email, user.phone);
      connection.end();
      res.status(201).end();  // return 201 Created
    } else {
      /** user exist */
      const permissions = await getPermissions(connection, uid);
      connection.end();
      const session = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone,
        websites: permissions
      };
      res.status(202).send(session);  // return 202 accepted
    }
  } catch (error) {
    res.status(401).end();  // send no content
  }
};