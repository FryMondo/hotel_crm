const db = require('../database');

module.exports = (req, res) => {
  const sql =
    'SELECT * FROM rooms INNER JOIN roominformation ON rooms.roomInformationID = roominformation.ID';
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error getting room information');
      return;
    }
    res.status(200).json(results);
  });
};
