const express = require('express');
const session = require('express-session');
const passport = require('passport');
const i18next = require('./config/i18next');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const fileQueue = require('./queues/fileQueue'); // Import the queue
const app = express();
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(i18nextMiddleware.handle(i18next));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the File Manager Application');
});

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;