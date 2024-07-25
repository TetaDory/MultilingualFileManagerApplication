// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const i18n = require('i18n');
const fs = require('fs');
const path = require('path');
const Queue = require('bull');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'file_manager'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

i18n.configure({
    locales: ['en', 'es', 'fr'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    cookie: 'lang'
});

app.use(i18n.init);

app.use((req, res, next) => {
    const lang = req.headers['accept-language'];
    if (lang) i18n.setLocale(lang);
    next();
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const fileQueue = new Queue('file-queue', {
    redis: { host: '127.0.0.1', port: 6379 }
});

// User Registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

// User Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.send('Invalid credentials');
            }
        } else {
            res.send('User not found');
        }
    });
});

app.listen(5000, () => { // Changed to port 5000
    console.log('Server started on port 5000');
});
