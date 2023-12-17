const db = require('../database');

module.exports = (req, res) => {
    const { users } = req.body;
    const sql = 'UPDATE roles SET role = IF(role = "BASE", "ADMIN", "BASE") WHERE username IN (?)';
    db.query(sql, [users], (err, result) => {
        if (err) {
            console.log('Помилка при виконанні запиту:', err);
            res.status(500).send('Помилка при зміні ролей');
            return;
        }

        res.status(200).send('Ролі успішно змінені');
    });
};
