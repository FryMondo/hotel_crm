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
            res.status(500).send('Error logging in');
            return;
        }
        if (results.length === 0) {
            res.json({success: false, message: '(!) Невірна пошта'});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, results[0].password);

        if (isPasswordValid) {
            res.json({
                success: true,
                message: 'Успішний логін',
                username: results[0].username
            });
        } else {
            res.json({success: false, message: '(!) Невірний пароль'});
        }
    });
});

app.post('/reservation', async (req, res) => {
    const {roomNumber, numberOfRooms, roomArea, placesInRoom, description, roomType, roomCost} = req.body;
    try {
        const sqlRoomInfo = 'INSERT INTO roominformation (placesInRoom, roomType, roomCost) VALUES (?, ?, ?)';
        const roomInformationValues = [placesInRoom, roomType, roomCost];
        db.query(sqlRoomInfo, roomInformationValues, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error adding info into table roominformation');
                return;
            }
            const roomInformationID = result.insertId;
            const sqlRooms = 'INSERT INTO rooms (roomNumber, numberOfRooms, roomArea, description, roomInformationID) VALUES (?, ?, ?, ?, ?)';
            const roomsValues = [roomNumber, numberOfRooms, roomArea, description, roomInformationID];
            db.query(sqlRooms, roomsValues, (err, result) => {
                if (err) {
                    console.log('Error executing query:', err);
                    res.status(500).send('Error adding info into table rooms');
                    return;
                }
                res.status(200).send('Successfully added information in roominformation and rooms');
            });
        });
    } catch (error) {
        res.status(500).send('Error adding info');
    }
});

app.get('/getRooms', (req, res) => {
    const sql = 'SELECT * FROM rooms INNER JOIN roominformation ON rooms.roomInformationID = roominformation.ID';
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            res.status(500).send('Error getting room information');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/addInfo', async (req, res) => {
    const {username, phone, surname, firstName} = req.body;
    try {
        const sqlUserInfo = 'INSERT INTO userinfo (username, phone, surname, firstName) VALUES (?, ?, ?, ?)';
        const valuesUserInfo = [username, phone, surname, firstName];
        db.query(sqlUserInfo, valuesUserInfo, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error adding info');
                return;
            }
            res.status(200).send('Information added successfully');
        });
    } catch (error) {
        res.status(500).send('Error adding info');
    }
});

app.post('/reserveRoom', async (req, res) => {
    const {usernameID, startDate, endDate, roomNumberID, numberOfPeople} = req.body;
    try {
        const sqlReserve = 'INSERT INTO roomreservation (usernameID, startDate, endDate, roomNumberID, numberOfPeople) VALUES (?, ?, ?, ?, ?)';
        const valuesReserve = [usernameID, startDate, endDate, roomNumberID, numberOfPeople];
        db.query(sqlReserve, valuesReserve, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error adding info');
                return;
            }
            res.status(200).send('Information added successfully');
        });
    } catch (error) {
        res.status(500).send('Error adding info');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});