const auth = {
  verifyIdToken: (token) => {
    return new Promise((resolve, reject) => {
      if (token===undefined) {
        reject('error: token is undefined');
      }

      if (token==='') {
        reject('error: token is empty');
      }

      if (token==='1qaz2wsx3edc4rfv5tgb') {
        const decodedToken = {
          uid: '1qw23er45ty67ui8'
        };
        resolve(decodedToken)
      } else {
        reject('error: the token doesn\'t exist.');
      }
    });
  }
};

const firebaseAdmin = {
  initializeApp: (credentianObject) => {},
  credential: {
    cert: () => {}
  },
  auth: () => auth
};

module.exports = firebaseAdmin;