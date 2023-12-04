const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hotel_crm'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        const values = [email, username, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error registering user');
                return;
            }

            console.log('User registered successfully');
            res.status(200).send('User registered successfully');
        });
    } catch (error) {
        console.log('Error hashing password:', error);
        res.status(500).send('Error registering user');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});