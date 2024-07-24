const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'file_manager'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Register endpoint
app.post('/auth/register', (req, res) => {
    const { email, password } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');

        // Store user
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, hash], (err, results) => {
            if (err) return res.status(500).send('Error registering user');
            res.status(200).send('User registered');
        });
    });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Check user
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send('Error retrieving user');
        if (results.length === 0) return res.status(401).send('Invalid credentials');

        // Compare password
        bcrypt.compare(password, results[0].password, (err, match) => {
            if (err) return res.status(500).send('Error comparing password');
            if (!match) return res.status(401).send('Invalid credentials');

            // Issue token
            const token = jwt.sign({ userId: results[0].id }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
