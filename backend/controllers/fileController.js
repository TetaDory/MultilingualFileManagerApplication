<<<<<<< HEAD
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

exports.uploadFile = (req, res) => {
  const { userId } = req.user;
  const { originalname, path: filePath, size, mimetype } = req.file;
  File.createFile(userId, originalname, filePath, size, mimetype, (err) => {
    if (err) return res.status(500).send('Error saving file.');
    res.status(200).send('File uploaded');
  });
};

exports.getFile = (req, res) => {
  const { id } = req.params;
  File.getFileById(id, (err, results) => {
    if (err) return res.status(500).send('Error retrieving file.');
    if (results.length === 0) return res.status(404).send('File not found.');
    res.sendFile(path.join(__dirname, '../uploads', results[0].file_path));
  });
};

exports.deleteFile = (req, res) => {
  const { id } = req.params;
  File.getFileById(id, (err, results) => {
    if (err) return res.status(500).send('Error retrieving file.');
    if (results.length === 0) return res.status(404).send('File not found.');

    fs.unlink(results[0].file_path, (err) => {
      if (err) return res.status(500).send('Error deleting file.');
      File.deleteFile(id, (err) => {
        if (err) return res.status(500).send('Error deleting file from database.');
        res.status(200).send('File deleted');
      });
    });
  });
};
=======
const fileQueue = require('../../queues/fileQueue');

const fileController = {
  createFile: async (req, res) => {
    // Handle file creation logic
    const { filePath } = req.body;
    // Add a new job to the queue
    await fileQueue.add({ filePath });
    res.send('File added to queue for processing');
  },
  readFile: (req, res) => {
    // Handle file reading
  },
  updateFile: (req, res) => {
    // Handle file updating
  },
  deleteFile: (req, res) => {
    // Handle file deletion
  }
};

module.exports = fileController;
>>>>>>> 7bf3791cde50b566130a2a3ebdd5076e3b326317
