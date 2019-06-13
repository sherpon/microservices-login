
/**
 * 
 * @param {object} firestore 
 * @param {string} userId 
 * @returns {Promise}  
 */
const getUser = (firestore, userId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('users').doc(userId).get()
    .then(function(doc) {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        resolve({...doc.data(), id: userId});
      } else {
        // doc.data() will be undefined in this case
        resolve(false);
      }
    }).catch(function(error) {
      // console.log("Error getting document:", error);
      reject(error);
    });
  });
};

module.exports = getUser;