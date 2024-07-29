// routes/file.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const auth = require('../middleware/auth');

router.post('/upload', auth, fileController.upload);
router.get('/', auth, fileController.getFiles);
router.delete('/:id', auth, fileController.deleteFile);

module.exports = router;
