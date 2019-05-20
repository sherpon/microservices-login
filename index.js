"use strict";

import getToken from './tools/getToken';

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
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  res.set('Access-Control-Allow-Origin', '*');
  
  const myAuthentication = getToken(req.headers);

  const myToken = `My token is ...${myAuthentication.token}`;
  const myMessage = `I am ${req.body.name} and my id is ${req.body.id}`;
  const myEnv = `My DB_HOST env is...${process.env.DB_HOST}`

  res.status(202).send({
    "Code": "holi",
    "message": myMessage,
    "token": myToken,
    "env": myEnv
  });
};