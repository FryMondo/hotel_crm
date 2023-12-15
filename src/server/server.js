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

const login = require('./serverParts/LoginServer');
const registration = require('./serverParts/RegistrServer');
const addRoomInfoServer = require('./serverParts/AddRoomInfoServer');
const takeRoomInfoServer = require('./serverParts/TakeRoomInfoServer');
const addUserInfoServer = require('./serverParts/AddUserInfoServer');
const reserveServer = require('./serverParts/ReserveServer');
const availableRoomServer = require('./serverParts/AvalableRoomServer');
const userRoleServer = require('./serverParts/UserRoleServer');

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

app.post('/register', registration);

app.post('/login', login);

app.post('/reservation', addRoomInfoServer);

app.get('/getRooms', takeRoomInfoServer);

app.post('/addInfo', addUserInfoServer);

app.post('/reserveRoom', reserveServer);

app.get('/getAvailableRooms', availableRoomServer);

app.get('/getUserRole', userRoleServer);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});