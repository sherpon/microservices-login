
/**
 * 
 * @param {Object} connection - MySQL connection object.
 * @param {String} uid - User uid
 * @returns {Promise} -  User object.
 */
const getUser = (connection, uid) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT * FROM Users
    WHERE id LIKE '${uid}'
    `;
    connection.query(query, (error, results, fields) => {
      if (error) {
        //reject(error);
        reject(new Error(error));
        //throw error;
      }

      // connected!
      if (results.length===0) {
        resolve(false);
      } else {
        const user = results[0];
        resolve({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      }
    });
  });
};

module.exports = getUser;