const db = require('../database');

module.exports = (req, res) => {
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
            const sqlRooms = `INSERT INTO rooms
                                  (roomNumber, numberOfRooms, roomArea, description, roomInformationID)
                              VALUES (?, ?, ?, ?, ?)`;
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
};