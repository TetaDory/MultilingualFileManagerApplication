// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('multilingual_file_manager', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
