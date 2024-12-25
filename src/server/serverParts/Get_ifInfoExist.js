const db = require('../database');

module.exports = (req, res) => {
  const { username } = req.query;
  const sql = 'SELECT COUNT(*) AS userCount FROM userinfo WHERE username = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error checking user info');
      return;
    }
    const userCount = result[0].userCount;
    const hasUserInfo = userCount > 0;
    res.status(200).json({ hasUserInfo });
  });
};
