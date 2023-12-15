const db = require('../database');

module.exports = (req, res) => {
    const {username, phone, surname, firstName} = req.body;
    try {
        const sqlUserInfo = 'INSERT INTO userinfo (username, phone, surname, firstName) VALUES (?, ?, ?, ?)';
        const valuesUserInfo = [username, phone, surname, firstName];
        db.query(sqlUserInfo, valuesUserInfo, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error adding info');
                return;
            }
            res.status(200).send('Information added successfully');
        });
    } catch (error) {
        res.status(500).send('Error adding info');
    }
};
