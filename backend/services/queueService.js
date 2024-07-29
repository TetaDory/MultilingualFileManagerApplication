const Queue = require('bull');
const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

const fileQueue = new Queue('file-queue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
});

fileQueue.process(async (job, done) => {
  try {
    // Simulate file processing
    console.log(`Processing file: ${job.data.filePath}`);
    done();
  } catch (error) {
    done(new Error('Error processing file'));
  }
});

module.exports = {
  addFileToQueue: async (filePath) => {
    await fileQueue.add({ filePath });
  },
};
