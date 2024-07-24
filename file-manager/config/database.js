const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_database'
});

// Export the pool for use in other files
module.exports = pool.promise(); // Use .promise() to get a promise-based API