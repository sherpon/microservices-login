
const getPermissions = (firestore, userId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('websites').where(`permissions.${userId}`, '==', 'administrator')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        //console.log('No matching documents.');
        //return;
        resolve([]);
      }
      let permissions = [];
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        permissions.push({...doc.data(), id: doc.id, createdAt: doc.data().createdAt._seconds*1000});
      });
      resolve(permissions);
    })
    .catch(err => {
      console.error('Error getting documents', err);
      reject(err);
    });
  });
};

module.exports = getPermissions;