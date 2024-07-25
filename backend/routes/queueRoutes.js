const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/queue', upload.single('file'), queueController.addToQueue);

module.exports = router;
