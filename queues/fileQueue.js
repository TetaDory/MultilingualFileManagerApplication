const Queue = require('bull');

const fileQueue = new Queue('fileQueue', {
  redis: { port: 6379, host: '127.0.0.1' }
});

fileQueue.process(async (job, done) => {
  try {
    const { filePath } = job.data;
    // Perform the file task, e.g., file processing or uploading
    console.log(`Processing file: ${filePath}`);
    // Simulate a task with a timeout
    setTimeout(() => {
      console.log(`File processed: ${filePath}`);
      done();
    }, 3000);
  } catch (error) {
    done(new Error('Error processing file'));
  }
});

module.exports = fileQueue;