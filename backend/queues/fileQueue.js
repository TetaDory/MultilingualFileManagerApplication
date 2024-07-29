const Queue = require('bull');
const fileQueue = new Queue('fileQueue', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

fileQueue.process(async (job, done) => {
  // Process file upload or conversion
  console.log('Processing job:', job.data);
  done();
});

module.exports = fileQueue;
