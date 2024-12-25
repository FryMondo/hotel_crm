const db = require('../database');

module.exports = (req, res) => {
  const { username } = req.query;
  const sql = 'SELECT role FROM roles WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error getting role');
      return;
    }
    res.status(200).json(results);
  });
};
