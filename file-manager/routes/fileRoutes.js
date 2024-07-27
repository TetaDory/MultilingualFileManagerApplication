router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files/:id', fileController.getFile);
router.delete('/files/:id', fileController.deleteFile);

module.exports = router;