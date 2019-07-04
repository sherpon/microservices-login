const Firestore = require('@google-cloud/firestore');

const saveUser = (firestore, id, name, email, phone) => {
  const timestamp = Firestore.Timestamp.now();
  return firestore.collection('users').doc(id).set({
    name,
    email,
    phone,
    paymentProcessor: {},
    createdAt: timestamp,
  });
};

module.exports = saveUser;