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