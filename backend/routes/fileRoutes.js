<<<<<<< HEAD
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files/:id', fileController.getFile);
router.delete('/files/:id', fileController.deleteFile);

module.exports = router;
=======
const express = require('express');
const fileController = require('../controllers/fileController');
const ensureAuthenticated = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/file', ensureAuthenticated, fileController.createFile);
router.get('/file/:id', ensureAuthenticated, fileController.readFile);
router.put('/file/:id', ensureAuthenticated, fileController.updateFile);
router.delete('/file/:id', ensureAuthenticated, fileController.deleteFile);

module.exports = router;
>>>>>>> 7bf3791cde50b566130a2a3ebdd5076e3b326317
