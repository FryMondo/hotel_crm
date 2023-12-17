const db = require('../database');

module.exports = (req, res) => {
    const sql = `SELECT rr.roomNumberID, ri.placesInRoom
                 FROM roomreservation rr
                          JOIN rooms r ON rr.roomNumberID = r.roomNumber
                          JOIN roominformation ri ON r.roomInformationID = ri.ID`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            res.status(500).send('Error getting room information');
            return;
        }
        res.status(200).json(results);
    });
};