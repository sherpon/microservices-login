//"use strict";

const getEnv = require('./tools/getEnv');
const getToken = require('./tools/getToken');
const getUserByToken = require('./tools/getUserByToken');
const getConnection = require('./mysql/getConnection');

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
exports.login = (req, res) => {
  // Get env variables
  getEnv();

  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  res.set('Access-Control-Allow-Origin', '*');
  
  const myAuthentication = getToken(req.headers);
  if (myAuthentication===false) {
    // didn't find any token
    res.status(401).end();  // send no content
  }

  const myToken = myAuthentication.token;
  getUserByToken(myToken)
  .then(uid => {
    const connection = getConnection();
    connection.connect();
    //getUser
    if (/** user !== exist */) {
      // saveUser
      connection.end();
      // return 201 Created
    } else {
      /** user === exist */
      // getPermissions
      connection.end();
      // return 202 accepted
      /**
        {
          "id": String,
          "name": String,
          "email": String,
          "phone": String,
          "websites": Object[]
        }
       */
    }
  })
  .catch(error => {
    // didn't find any user
    res.status(401).end();  // send no content
  });

  /*
  const myToken = `My token is ...${myAuthentication.token}`;
  const myMessage = `I am ${req.body.name} and my id is ${req.body.id}`;
  const myEnv = `My ENV.MYSQL_DB_HOST env is...${ENV.MYSQL_DB_HOST}`

  res.status(202).send({
    "Code": "holi",
    "message": myMessage,
    "token": myToken,
    "env": myEnv
  });
  */
};