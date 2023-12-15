export default {
    data() {
        return {
            roomNumber: null,
            numberOfRooms: null,
            roomArea: null,
            placesInRoom: null,
            description: '',
            roomType: '',
            roomCost: null,
            rooms: [],
            errors: {},
            isAdmin: false,
            role: ''
        }
    },
    methods: {
        clearError(errorID) {
            delete this.errors[errorID];
        },
        async addInformation() {
            if (!this.validateRoomNumber() || !this.validateNumberOfRooms() || !this.validateRoomArea()
                || !this.validatePlacesInRoom() || !this.validateRoomType() || !this.validateRoomCost()
                || !this.validateDescription()) {
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        roomNumber: this.roomNumber,
                        numberOfRooms: this.numberOfRooms,
                        roomArea: this.roomArea,
                        placesInRoom: this.placesInRoom,
                        description: this.description,
                        roomType: this.roomType,
                        roomCost: this.roomCost
                    }),
                });
                await this.fetchData();
                this.roomNumber = null;
                this.numberOfRooms = null;
                this.roomArea = null;
                this.placesInRoom = null;
                this.description = '';
                this.roomType = null;
                this.roomCost = null;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchData() {
            try {
                const response = await fetch('http://localhost:3000/getRooms');
                if (response.ok) {
                    this.rooms = await response.json();
                } else {
                    console.error('Server response not OK');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchUserRole() {
            const username = localStorage.getItem('username');
            try {
                const response = await fetch(`http://localhost:3000/getUserRole?username=${username}`);
                if (response.ok) {
                    const data = await response.json();
                    this.role = data[0].role;
                    this.isAdmin = this.role === "ADMIN";
                } else {
                    console.error('Server response not OK');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        validateRoomNumber() {
            const minNumber = 1;
            const maxNumber = 150;
            const isRoomNumberExists = this.rooms.some(room => room.roomNumber === this.roomNumber);

            if (this.roomNumber === null || this.roomNumber === undefined) {
                this.errors.roomNumber = `(!) Додайте номер`;
            } else if (this.roomNumber < minNumber) {
                this.errors.roomNumber = `(!) Мінімальний номер: ${minNumber}`;
                return false;
            } else if (this.roomNumber > maxNumber) {
                this.errors.roomNumber = `(!) Максимальний номер: ${maxNumber}`;
                return false;
            } else if (isRoomNumberExists) {
                this.errors.roomNumber = '(!) Такий номер вже існує';
                return false;
            } else {
                return true;
            }
        },
        validateNumberOfRooms() {
            const minRooms = 1;
            const maxRooms = 6;

            if (this.numberOfRooms === null || this.numberOfRooms === undefined) {
                this.errors.numberOfRooms = `(!) Додайте кімнати`;
            } else if (this.numberOfRooms < minRooms) {
                this.errors.numberOfRooms = `(!) Мінімальна кількість кімнат: ${minRooms}`;
                return false;
            } else if (this.numberOfRooms > maxRooms) {
                this.errors.numberOfRooms = `(!) Максимальна кількість кімнат: ${maxRooms}`;
                return false;
            } else {
                return true;
            }
        },
        validateRoomArea() {
            const minArea = 25;
            const maxArea = 70;

            if (this.roomArea === null || this.roomArea === undefined) {
                this.errors.roomArea = `(!) Додайте площу`;
            } else if (this.roomArea < minArea) {
                this.errors.roomArea = `(!) Мінімальна площа: ${minArea}`;
                return false;
            } else if (this.roomArea > maxArea) {
                this.errors.roomArea = `(!) Максимальна площа: ${maxArea}`;
                return false;
            } else {
                return true;
            }
        },
        validatePlacesInRoom() {
            const minPlaces = 1;
            const maxPlaces = 5;

            if (this.placesInRoom === null || this.placesInRoom === undefined) {
                this.errors.placesInRoom = `(!) Додайте людей`;
            } else if (this.placesInRoom < minPlaces) {
                this.errors.placesInRoom = `(!) Мінімально людей: ${minPlaces}`;
                return false;
            } else if (this.placesInRoom > maxPlaces) {
                this.errors.placesInRoom = `(!) Максимально людей: ${maxPlaces}`;
                return false;
            } else {
                return true;
            }
        },
        validateRoomType() {
            if (!this.roomType.trim()) {
                this.errors.roomType = '(!) Заповніть тип номеру';
                return false;
            } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(this.roomType)) {
                this.errors.roomType = '(!) Тип номеру не може містити цифр';
                return false;
            } else {
                return true;
            }
        },
        validateRoomCost() {
            const minPrice = 250;
            const maxPrice = 10000;

            if (this.roomCost === null || this.roomCost === undefined) {
                this.errors.roomCost = `(!) Додайте ціну`;
            } else if (this.roomCost < minPrice) {
                this.errors.roomCost = `(!) Мінімальна ціна: ${minPrice}`;
                return false;
            } else if (this.roomCost > maxPrice) {
                this.errors.roomCost = `(!) Максимальна ціна: ${maxPrice}`;
                return false;
            } else {
                return true;
            }
        },
        validateDescription() {
            if (!this.description.trim()) {
                this.errors.description = '(!) Заповніть опис';
                return false;
            } else {
                return true;
            }
        },
    },
    mounted() {
        this.fetchData();
        this.fetchUserRole();
    }
}