const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const post_login = require('./serverParts/Post_login');
const post_registration = require('./serverParts/Post_registration');
const post_addRoomInfo = require('./serverParts/Post_roomInfo');
const post_addUserInfo = require('./serverParts/Post_userInfo');
const post_reservation = require('./serverParts/Post_reservation');

const get_RoomInfo = require('./serverParts/Get_roomInfo');
const get_availableRoom = require('./serverParts/Get_avalableRoom');
const get_userRole = require('./serverParts/Get_userRole');
const get_reserved = require('./serverParts/Get_reserved');
const get_allUsers = require('./serverParts/Get_allUsers');
const get_reservedInfo = require('./serverParts/Get_reservedInfo');
const get_existing = require('./serverParts/Get_ifInfoExist');
const get_roomNumber = require('./serverParts/Get_roomNumber');

const update_roles = require('./serverParts/Update_roles');
const update_reservation = require('./serverParts/Update_reservedRooms');
const update_userInfo = require('./serverParts/Update_userInfo');

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

app.post('/register', post_registration);

app.post('/login', post_login);

app.post('/reservation', post_addRoomInfo);

app.get('/getRooms', get_RoomInfo);

app.post('/addInfo', post_addUserInfo);

app.post('/reserveRoom', post_reservation);

app.get('/getAvailableRooms', get_availableRoom);

app.get('/getUserRole', get_userRole);

app.get('/getReserved', get_reserved);

app.get('/getAllUsers', get_allUsers);

app.post('/updateRoles', update_roles);

app.get('/getReservedInfo', get_reservedInfo);

app.post('/updateReservation', update_reservation);

app.get('/checkUserInfo', get_existing);

app.post('/updateUserInfo', update_userInfo);

app.get('/checkRoomNumber', get_roomNumber);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});