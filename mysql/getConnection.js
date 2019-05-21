const mysql = require('mysql');

/**
 * @returns {Object} - returns the mysql connection object
 */
const getConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  return connection;
};

module.exports = getConnection;