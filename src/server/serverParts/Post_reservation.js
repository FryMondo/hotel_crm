const db = require('../database');

module.exports = (req, res) => {
    const {usernameID, startDate, endDate, roomNumberID, numberOfPeople} = req.body;
    try {
        const checkAvailabilityQuery = `SELECT *
                                        FROM roomreservation
                                        WHERE roomNumberID = ?
                                        AND ((startDate <= ? AND endDate >= ?) OR (startDate <= ? AND endDate >= ?))`;
        const checkAvailabilityValues = [roomNumberID, startDate, startDate, endDate, endDate];
        db.query(checkAvailabilityQuery, checkAvailabilityValues, (availabilityErr, availabilityResult) => {
            if (availabilityErr) {
                console.log('Error checking room availability:', availabilityErr);
                res.status(500).send('Error checking room availability');
                return;
            }
            if (availabilityResult.length > 0) {
                res.status(400).send('Room not available for the selected dates');
                return;
            }
            const sqlReserve = `INSERT INTO roomreservation
                                    (usernameID, startDate, endDate, roomNumberID, numberOfPeople)
                                VALUES (?, ?, ?, ?, ?)`;
            const valuesReserve = [usernameID, startDate, endDate, roomNumberID, numberOfPeople];

            db.query(sqlReserve, valuesReserve, (reserveErr, reserveResult) => {
                if (reserveErr) {
                    console.log('Error executing query:', reserveErr);
                    res.status(500).send('Error adding reservation information');
                    return;
                }

                res.status(200).send('Room reserved successfully');
            });
        });
    } catch (error) {
        res.status(500).send('Error adding reservation information');
    }
};