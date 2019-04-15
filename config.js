const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongo_pwd: process.env.MONGO_ATLAS_PASSWORD
};