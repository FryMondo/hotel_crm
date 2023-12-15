const db = require('../database');

module.exports = (req, res) => {
    const sql = `SELECT roomNumber
                 FROM rooms
                 WHERE roomNumber NOT IN (SELECT roomNumberID
                                          FROM roomreservation
                                          WHERE (endDate >= CURDATE()))`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            res.status(500).send('Error getting available rooms');
            return;
        }
        res.status(200).json(results);
    });

};