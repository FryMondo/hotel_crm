const db = require('../database');

module.exports = async (req, res) => {
    const {roomNumberID, numberOfPeople, startDate, endDate} = req.body;
    const sql = 'UPDATE roomreservation SET numberOfPeople = ?, startDate = ?, endDate = ? WHERE roomNumberID = ?';
    await db.query(sql, [numberOfPeople, startDate, endDate, roomNumberID]);

    res.status(200).send('Reservation updated successfully');
};
