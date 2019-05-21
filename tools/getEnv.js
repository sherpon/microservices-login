/**
 * Get the environment variables. 
 * 
 * See this issue to understand why use this function
 * https://github.com/googlearchive/cloud-functions-emulator/issues/178
 */
const getEnv = () => {

  if (process.env.SHERPON_ENV===undefined) {
    const ENV =  require('../env/.env.json');
    
    // copy the env variables
    process.env.SHERPON_ENV = ENV.SHERPON_ENV;
    process.env.FIREBASE_SERVICE_ACCOUNT = ENV.FIREBASE_SERVICE_ACCOUNT;
    process.env.MICROSERVICES_ENDPOINT = ENV.MICROSERVICES_ENDPOINT;
    process.env.MYSQL_DB_HOST = ENV.MYSQL_DB_HOST;
    process.env.MYSQL_DB_PORT = ENV.MYSQL_DB_PORT;
    process.env.MYSQL_DB_USER = ENV.MYSQL_DB_USER;
    process.env.MYSQL_DB_PASSWORD = ENV.MYSQL_DB_PASSWORD;
  }
}

module.exports = getEnv;