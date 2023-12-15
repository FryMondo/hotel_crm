const bcrypt = require("bcrypt");
const db = require('../database');

module.exports = async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
        const values = [email, username, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                res.status(500).send('Error registering user');
                return;
            }
            res.status(200).send('User registered successfully');
        });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};