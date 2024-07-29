const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const testRoute = require('./routes/test');
const userRoute = require('./routes/user');
const fileRoute = require('./routes/file');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/test', testRoute);
app.use('/api/users', userRoute);
app.use('/api/files', fileRoute);

module.exports = app;
