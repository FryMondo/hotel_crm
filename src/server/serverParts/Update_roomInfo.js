const db = require('../database');

module.exports = (req, res) => {
    const {roomNumber, numberOfRooms, roomArea, placesInRoom, description, roomType, roomCost} = req.body;
    try {
        const sqlRoomInfo = `UPDATE roominformation
                             SET placesInRoom = ?,
                                 roomType     = ?,
                                 roomCost     = ?
                             WHERE ID = (SELECT roomInformationID FROM rooms WHERE roomNumber = ?)`;
        const roomInformationValues = [placesInRoom, roomType, roomCost, roomNumber];
        db.query(sqlRoomInfo, roomInformationValues, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error updating info in roominformation');
                return;
            }
            const sqlRooms = `UPDATE rooms
                              SET numberOfRooms = ?,
                                  roomArea      = ?,
                                  description   = ?
                              WHERE roomNumber = ?`;
            const roomsValues = [numberOfRooms, roomArea, description, roomNumber];
            db.query(sqlRooms, roomsValues, (err, result) => {
                if (err) {
                    console.log('Error executing query:', err);
                    res.status(500).send('Error updating info in rooms');
                    return;
                }
                res.status(200).send('Successfully updated information in roominformation and rooms');
            });
        });
    } catch (error) {
        res.status(500).send('Error updating info');
    }
};
