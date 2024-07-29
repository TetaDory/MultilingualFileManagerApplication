// controllers/fileController.js
const File = require('../models').File;
const User = require('../models').User;
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage }).single('file');

/**
 * @desc Upload a file
 * @route POST /api/files
 * @access Private
 */
exports.upload = (req, res) => {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file.' });
    }
    const { id: userId } = req.user;
    const { file } = req;
    try {
      const newFile = await File.create({
        name: file.filename,
        size: file.size,
        type: file.mimetype,
        path: file.path,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.status(201).json(newFile);
    } catch (error) {
      res.status(500).json({ error: 'Error saving file information.', details: error.message });
    }
  });
};

/**
 * @desc Get all files for the authenticated user
 * @route GET /api/files
 * @access Private
 */
exports.getFiles = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const files = await File.findAll({ where: { userId: userId } });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving files.', details: error.message });
  }
};

/**
 * @desc Delete a file
 * @route DELETE /api/files/:id
 * @access Private
 */
exports.deleteFile = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const file = await File.findOne({ where: { id: id, userId: userId } });
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }
    await file.destroy();
    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file.', details: error.message });
  }
};
const fileQueue = require('../queues/fileQueue');

exports.upload = (req, res) => {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file.' });
    }
    const { id: userId } = req.user;
    const { file } = req;
    try {
      const newFile = await File.create({
        name: file.filename,
        size: file.size,
        type: file.mimetype,
        path: file.path,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      // Add job to queue
      fileQueue.add({ fileId: newFile.id });
      res.status(201).json(newFile);
    } catch (error) {
      res.status(500).json({ error: 'Error saving file information.', details: error.message });
    }
  });
};
