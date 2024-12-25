const db = require('../database');

module.exports = (req, res) => {
  const { username, phone, surname, firstName } = req.body;
  const sql =
    'INSERT INTO userinfo (username, phone, surname, firstName) VALUES (?, ?, ?, ?)';
  const values = [username, phone, surname, firstName];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error adding user info');
      return;
    }

    res.status(200).send('User info added successfully');
  });
};
