const db = require('../database');

module.exports = async (req, res) => {
    const { usernames } = req.body;

    try {
        const deleteUserInfoQuery = 'DELETE FROM userinfo WHERE username IN (?)';
        await db.query(deleteUserInfoQuery, [usernames]);

        const deleteRoomReservationQuery = 'DELETE FROM roomreservation WHERE usernameID IN (?)';
        await db.query(deleteRoomReservationQuery, [usernames]);

        const deleteRolesQuery = 'DELETE FROM roles WHERE username IN (?)';
        await db.query(deleteRolesQuery, [usernames]);

        const deleteUsersQuery = 'DELETE FROM users WHERE username IN (?)';
        await db.query(deleteUsersQuery, [usernames]);

        res.status(200).send('Користувачі видалені успішно');
    } catch (error) {
        console.error('Помилка видалення користувачів:', error);
        res.status(500).send('Помилка видалення користувачів');
    }
};
