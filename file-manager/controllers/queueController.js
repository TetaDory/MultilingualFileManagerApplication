const Queue = require('bull');
const fileQueue = new Queue('file-queue', 'redis://127.0.0.1:6379');

fileQueue.process(async (job) => {
  // Handle file processing job
  console.log('Processing job:', job.data);
});

exports.addToQueue = (req, res) => {
  fileQueue.add({ file: req.file });
  res.send('File processing started');
};
