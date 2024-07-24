const db = require('../config/db');

class File {
  static createFile(userId, fileName, filePath, fileSize, fileType, callback) {
    db.query('INSERT INTO files (user_id, file_name, file_path, file_size, file_type) VALUES (?, ?, ?, ?, ?)', [userId, fileName, filePath, fileSize, fileType], callback);
  }

  static getFilesByUser(userId, callback) {
    db.query('SELECT * FROM files WHERE user_id = ?', [userId], callback);
  }

  static getFileById(fileId, callback) {
    db.query('SELECT * FROM files WHERE id = ?', [fileId], callback);
  }

  static deleteFile(fileId, callback) {
    db.query('DELETE FROM files WHERE id = ?', [fileId], callback);
  }
}

module.exports = File;
