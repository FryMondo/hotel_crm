const db = require('../database');

module.exports = (req, res) => {
  const { roomNumber } = req.query;
  const sql = 'SELECT COUNT(*) as count FROM rooms WHERE roomNumber = ?';
  db.query(sql, [roomNumber], (err, result) => {
    if (err) {
      console.error('Error checking room number:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const count = result[0].count;
    const exists = count > 0;
    res.json({ exists });
  });
};
