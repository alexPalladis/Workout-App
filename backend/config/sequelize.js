require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use the environment variable provided by Heroku
const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This depends on your database's SSL configuration
    },
  },
});



module.exports = sequelize;
