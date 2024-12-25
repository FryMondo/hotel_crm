const bcrypt = require('bcrypt');
const db = require('../database');

module.exports = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userSql =
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const userValues = [email, username, hashedPassword];
    db.query(userSql, userValues, (userErr, userResult) => {
      if (userErr) {
        console.log('Error executing user query:', userErr);
        res.status(500).send('Error registering user');
        return;
      }
      const roleSql = 'INSERT INTO roles (username, role) VALUES (?, ?)';
      const roleValues = [username, 'BASE'];
      db.query(roleSql, roleValues, (roleErr, roleResult) => {
        if (roleErr) {
          console.log('Error executing role query:', roleErr);
          res.status(500).send('Error assigning role to user');
          return;
        }
        res.status(200).send('User registered successfully');
      });
    });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
};
