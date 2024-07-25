<<<<<<< HEAD
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
=======
const db = require('../config/database');

const User = {
  create: async (username, email, password, languagePreference) => {
    const [result] = await db.execute('INSERT INTO users (username, email, password, language_preference) VALUES (?, ?, ?, ?)', [username, email, password, languagePreference]);
    return result;
  },
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  // Add other necessary user-related methods
};

module.exports = User;
>>>>>>> 7bf3791cde50b566130a2a3ebdd5076e3b326317
