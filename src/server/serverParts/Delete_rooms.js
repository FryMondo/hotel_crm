const db = require('../database');

module.exports = async (req, res) => {
  const { roomNumbers } = req.body;

  if (!roomNumbers || !Array.isArray(roomNumbers) || roomNumbers.length === 0) {
    return res.status(400).send('Некоректні дані для видалення');
  }

  try {
    const deleteRoomReservationsQuery =
      'DELETE FROM roomreservation WHERE roomNumberID IN (?)';
    await db.query(deleteRoomReservationsQuery, [roomNumbers]);

    const deleteRoomInformationQuery =
      'DELETE FROM roominformation WHERE ID IN (SELECT roomInformationID FROM rooms WHERE roomNumber IN (?))';
    await db.query(deleteRoomInformationQuery, [roomNumbers]);

    const deleteRoomsQuery = 'DELETE FROM rooms WHERE roomNumber IN (?)';
    await db.query(deleteRoomsQuery, [roomNumbers]);

    res.status(200).send('Кімнати видалені успішно');
  } catch (error) {
    console.error('Помилка видалення кімнат:', error);
    res.status(500).send('Помилка видалення кімнат');
  }
};
