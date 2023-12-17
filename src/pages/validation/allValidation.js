export function validateStartDate(startDate, endDate, errors) {
    const selectedDate = new Date(startDate);
    const today = new Date();

    if (!startDate) {
        errors.startDate = '(!) Заповніть початок бронювання';
        return false;
    } else if (selectedDate < today) {
        errors.startDate = '(!) Не можна обрати минулий час';
        return false;
    } else if (selectedDate > new Date('2026-01-01')) {
        errors.startDate = '(!) Максимальна дата 01.01.2026';
        return false;
    } else {
        return true;
    }
}

export function validateEndDate(startDate, endDate, errors) {
    const selectedDate = new Date(endDate);
    const start = new Date(startDate);
    const today = new Date();

    if (!endDate) {
        errors.endDate = '(!) Заповніть кінець бронювання';
        return false;
    } else if (selectedDate < today) {
        errors.endDate = '(!) Не можна обрати минулий час';
        return false;
    } else if (selectedDate > new Date('2026-01-01')) {
        errors.endDate = '(!) Максимальна дата 01.01.2026';
        return false;
    } else if (selectedDate < start) {
        errors.endDate = '(!) Не можна обрати дату перед початком бронювання';
        return false;
    } else {
        return true;
    }
}

export function validateSelectedRoom(selectedRoom, errors) {
    if (!selectedRoom) {
        errors.selectedRoom = "(!) Оберіть кімнату";
        return false;
    } else {
        return true;
    }
}

export function validateNumberOfPeople(numberOfPeople, errors) {
    if (!numberOfPeople) {
        errors.numberOfPeople = "(!) Оберіть кількість людей";
        return false;
    } else {
        return true;
    }
}

export function validateSurname(surname, errors) {
    if (!surname.trim()) {
        errors.surname = '(!) Заповніть поле Прізвище';
        return false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(surname)) {
        errors.surname = '(!) Поле Прізвище не повинно містити цифри';
        return false;
    } else {
        return true;
    }
}

export function validateFirstName(firstName, errors) {
    if (!firstName.trim()) {
        errors.firstName = '(!) Заповніть поле Ім\'я';
        return false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(firstName)) {
        errors.firstName = '(!) Поле Ім\'я не повинно містити цифри';
        return false;
    } else {
        return true;
    }
}

export function validatePhone(phone, errors) {
    if (phone.length >= 18) {
        return true;
    } else {
        errors.phone = '(!) Введіть всі цифри в номер';
        return false;
    }
}

export function validateEmail(email, errors) {
    if (!email.trim()) {
        errors.email = '(!) Заповніть поле Email';
        return false;
    } else if (!this.RegExpEmail(email)) {
        errors.email = '(!) Невірний формат Email';
        return false;
    } else {
        return true;
    }
}

export function RegExpEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

export function validatePassword(password, errors) {
    if (!password.trim()) {
        errors.password = '(!) Заповніть поле Пароль';
        return false;
    } else if (password.trim().length < 8) {
        errors.password = '(!) Пароль повинен містити мінімум 8 символів';
        return false;
    } else if (/\s/.test(password)) {
        errors.password = '(!) Пароль не повинен містити пробіли';
        return false;
    } else if (!/[a-zа-яёіїє]/.test(password)) {
        errors.password = '(!) Пароль повинен містити 1 маленьку літеру';
        return false;
    } else if (!/[A-ZА-ЯЁІЇЄ]/.test(password)) {
        errors.password = '(!) Пароль повинен містити 1 велику літеру';
        return false;
    } else {
        return true;
    }
}

export function validateUsername(username, errors) {
    if (!username.trim()) {
        errors.username = '(!) Заповніть поле Username';
        return false;
    } else if (username.trim().length < 3) {
        errors.username = '(!) Username повинен мати хоча б 3 символи';
        return false;
    } else {
        return true;
    }
}

export function validateRoomNumber(rooms, roomNumber, errors) {
    const minNumber = 1;
    const maxNumber = 150;
    const isRoomNumberExists = rooms.some(room => room.roomNumber === roomNumber);

    if (roomNumber === null || roomNumber === undefined) {
        errors.roomNumber = `(!) Додайте номер`;
        return false;
    } else if (roomNumber < minNumber) {
        errors.roomNumber = `(!) Мінімальний номер: ${minNumber}`;
        return false;
    } else if (roomNumber > maxNumber) {
        errors.roomNumber = `(!) Максимальний номер: ${maxNumber}`;
        return false;
    } else if (isRoomNumberExists) {
        errors.roomNumber = '(!) Такий номер вже існує';
        return false;
    } else {
        return true;
    }
}

export function validateNumberOfRooms(numberOfRooms, errors) {
    const minRooms = 1;
    const maxRooms = 6;

    if (numberOfRooms === null || numberOfRooms === undefined) {
        errors.numberOfRooms = `(!) Додайте кімнати`;
    } else if (numberOfRooms < minRooms) {
        errors.numberOfRooms = `(!) Мінімальна кількість кімнат: ${minRooms}`;
        return false;
    } else if (numberOfRooms > maxRooms) {
        errors.numberOfRooms = `(!) Максимальна кількість кімнат: ${maxRooms}`;
        return false;
    } else {
        return true;
    }
}

export function validateRoomArea(roomArea, errors) {
    const minArea = 25;
    const maxArea = 70;

    if (roomArea === null || roomArea === undefined) {
        errors.roomArea = `(!) Додайте площу`;
    } else if (roomArea < minArea) {
        errors.roomArea = `(!) Мінімальна площа: ${minArea}`;
        return false;
    } else if (roomArea > maxArea) {
        errors.roomArea = `(!) Максимальна площа: ${maxArea}`;
        return false;
    } else {
        return true;
    }
}

export function validatePlacesInRoom(placesInRoom, errors) {
    const minPlaces = 1;
    const maxPlaces = 5;

    if (placesInRoom === null || placesInRoom === undefined) {
        errors.placesInRoom = `(!) Додайте людей`;
    } else if (placesInRoom < minPlaces) {
        errors.placesInRoom = `(!) Мінімально людей: ${minPlaces}`;
        return false;
    } else if (placesInRoom > maxPlaces) {
        errors.placesInRoom = `(!) Максимально людей: ${maxPlaces}`;
        return false;
    } else {
        return true;
    }
}

export function validateRoomType(roomType, errors) {
    if (!roomType.trim()) {
        errors.roomType = '(!) Заповніть тип номеру';
        return false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(roomType)) {
        errors.roomType = '(!) Тип номеру не може містити цифр';
        return false;
    } else {
        return true;
    }
}

export function validateRoomCost(roomCost, errors) {
    const minPrice = 250;
    const maxPrice = 10000;

    if (roomCost === null || roomCost === undefined) {
        errors.roomCost = `(!) Додайте ціну`;
    } else if (roomCost < minPrice) {
        errors.roomCost = `(!) Мінімальна ціна: ${minPrice}`;
        return false;
    } else if (roomCost > maxPrice) {
        errors.roomCost = `(!) Максимальна ціна: ${maxPrice}`;
        return false;
    } else {
        return true;
    }
}

export function validateDescription(description, errors) {
    if (!description.trim()) {
        errors.description = '(!) Заповніть опис';
        return false;
    } else {
        return true;
    }
}