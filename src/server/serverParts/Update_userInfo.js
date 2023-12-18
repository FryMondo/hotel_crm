const db = require('../database');

module.exports = async (req, res) => {
    const { username, firstName, surname, phone } = req.body;
    const sql = 'UPDATE userinfo SET firstName = ?, surname = ?, phone = ? WHERE username = ?';
    db.query(sql, [firstName, surname, phone, username], (err, result) => {
        if (err) {
            console.log('Помилка при виконанні запиту:', err);
            res.status(500).send('Помилка при оновленні інформації користувача');
            return;
        }
        res.status(200).send('Інформацію користувача оновлено успішно');
    });
};
