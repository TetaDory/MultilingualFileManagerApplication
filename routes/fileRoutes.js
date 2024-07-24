const express = require('express');
const fileController = require('../controllers/fileController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/file', ensureAuthenticated, fileController.createFile);
router.get('/file/:id', ensureAuthenticated, fileController.readFile);
router.put('/file/:id', ensureAuthenticated, fileController.updateFile);
router.delete('/file/:id', ensureAuthenticated, fileController.deleteFile);

module.exports = router;