
/**
 * 
 * @param {String} id 
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 * @returns {Promise} - return true if was successful. Otherwise, return false
 */
const saveUser = (connection, id, name, email, phone) => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const sql = `
    INSERT INTO Users
    VALUES ('${id}','${name}','${email}','${phone}',${today})
    `;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(new Error(error));
        //throw error;
      }
      // ...
      resolve(true);
    });
  });
};

module.exports = saveUser;