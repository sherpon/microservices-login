/**
 * Get the environment variables. 
 * 
 * See this issue to understand why use this function
 * https://github.com/googlearchive/cloud-functions-emulator/issues/178
 */
const getEnv = () => {
  let ENV = {};

  if (process.env.MICROSERVICES_ENDPOINT===undefined) {
    ENV =  require('../env/.env.json');
  } else {
    ENV = {
      MICROSERVICES_ENDPOINT: process.env.MICROSERVICES_ENDPOINT,
      MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
      MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
      MYSQL_DB_USER: process.env.MYSQL_DB_USER,
      MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
    };
  }

  return ENV;
}

module.exports = getEnv;