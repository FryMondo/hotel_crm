const db = require('../database');

module.exports = (req, res) => {
  const { username } = req.query;

  const sql = `
        SELECT u.email,
               u.username,
               r.role,
               IFNULL(ui.phone, 'Порожньо')     AS phone,
               IFNULL(ui.surname, 'Порожньо')   AS surname,
               IFNULL(ui.firstName, 'Порожньо') AS firstName
        FROM users u
                 INNER JOIN roles r ON u.username = r.username
                 LEFT JOIN userinfo ui ON u.username = ui.username
        WHERE u.username <> ?
    `;

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.log('Error executing query:', err);
      res.status(500).send('Error getting users');
      return;
    }
    res.status(200).json(result);
  });
};
