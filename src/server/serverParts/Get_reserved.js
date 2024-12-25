const db = require('../database');

module.exports = (req, res) => {
  const { usernameID } = req.query;
  const sql =
    'SELECT startDate, endDate, roomNumberID, numberOfPeople FROM roomreservation WHERE usernameID = ?';
  db.query(sql, [usernameID], (err, results) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error getting role');
      return;
    }
    res.status(200).json(results);
  });
};
