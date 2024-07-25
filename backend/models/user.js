const db = require('../config/db');

class User {
  static findByUsername(username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  }

  static createUser(username, password, callback) {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
  }

  static findById(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }
}

module.exports = User;
