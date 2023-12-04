const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
    const {email, username, password} = req.body;
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
            res.status(200).send('User registered successfully');
        });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    db.query(sql, values, async (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            res.status(500).send('Error logging in');
            return;
        }
        if (results.length === 0) {
            res.json({success: false, message: 'Невірна пошта або пароль'});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, results[0].password);

        if (isPasswordValid) {
            res.json({success: true, message: 'Успішний логін'});
        } else {
            res.json({success: false, message: 'Невірна пошта або пароль'});
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});