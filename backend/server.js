// server.js
require('dotenv').config();
console.log('Environment Variables:', {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET
});

// The rest of your server.js code

const express = require('express');
const app = require('./app'); // Assuming your Express app is exported from app.js
const { sequelize } = require('./models'); // Sequelize instance

const PORT = process.env.PORT || 4001;

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
