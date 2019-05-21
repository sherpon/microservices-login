const admin = require('firebase-admin');
const getEnv = require('./getEnv');

const ENV = getEnv();

if (ENV.DEVELOPMENT===true) {
  admin.initializeApp({
    credential: admin.credential.cert(ENV.FIREBASE_SERVICE_ACCOUNT)
  });
} else {
  admin.initializeApp();
}

/**
 * 
 * @param {String} token - Firebase authentication token.
 * @returns {Promise} - return the user's uid or false. 
 */
const getUserByToken = (token) => {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid
      resolve(uid)
    })
    .catch(function(error) {
      // Handle error
      reject(new Error(error))
    })
  });
};

module.exports = getUserByToken;