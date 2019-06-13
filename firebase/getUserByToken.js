/**
 * 
 * @param {String} token - Firebase authentication token.
 * @returns {Promise} - return the user's uid. 
 */
const getUserByToken = (firebase, token) => {
  return new Promise((resolve, reject) => {
    firebase.auth().verifyIdToken(token)
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