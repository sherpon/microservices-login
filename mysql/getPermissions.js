
/**
 * 
 * @param {Object} connection - MySQL connection Object.
 * @param {String} userId 
 * @return {Promise} - return the permissions
 */
/**

 */
const getPermissions = (connection, userId) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT Websites.*, Permissions.type
    FROM Websites INNER JOIN Permissions
    ON Websites.id=Permissions.websiteId
    WHERE Permissions.userId='${userId}'
    `;
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(new Error(error));
      }

      // connected!
      resolve(results);
    });
  });
};

module.exports = getPermissions;