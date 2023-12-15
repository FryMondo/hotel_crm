const bcrypt = require("bcrypt");
const db = require('../database');

module.exports = (req, res) => {
    const {email, password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    db.query(sql, values, async (err, results) => {
        if (err) {
            res.status(500).send('Error logging in');
            return;
        }
        if (results.length === 0) {
            res.json({success: false, message: '(!) Невірна пошта'});
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, results[0].password);
        if (isPasswordValid) {
            res.json({
                success: true,
                message: 'Успішний логін',
                username: results[0].username
            });
        } else {
            res.json({success: false, message: '(!) Невірний пароль'});
        }
    });
};
