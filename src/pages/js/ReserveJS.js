export default {
    data() {
        return {
            startDate: '',
            endDate: '',
            roomNumber: '',
            numberOfPeople: 1,
            selectedRoom: '',
            roomList: [],
            peopleCountOptions: [],
            errors: {},
            availableRooms: []
        }
    },
    methods: {
        clearError(errorID) {
            delete this.errors[errorID];
        },
        handleRoomChange() {
            this.updateNumberOfPeople();
            this.clearError('selectedRoom');
        },
        async reserveRoom() {
            try {
                const username = localStorage.getItem('username');
                if (!username || !this.validateStartDate() || !this.validateEndDate() || !this.validateSelectedRoom()
                    || !this.validateNumberOfPeople()) {
                    return;
                }

                const responseAddInfo = await fetch('http://localhost:3000/reserveRoom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usernameID: username,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        roomNumberID: this.selectedRoom,
                        numberOfPeople: this.numberOfPeople
                    }),
                });
                this.startDate = '';
                this.endDate = '';
                this.selectedRoom = '';
                this.numberOfPeople = '';
                await this.fetchAvailableRooms();
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchData() {
            try {
                const response = await fetch('http://localhost:3000/getRooms');
                if (response.ok) {
                    this.roomList = await response.json();
                } else {
                    console.error('Server response not OK');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchAvailableRooms() {
            try {
                const response = await fetch('http://localhost:3000/getAvailableRooms');
                if (response.ok) {
                    this.availableRooms = await response.json();
                } else {
                    console.error('Server response not OK');
                }
            } catch (error) {
                console.error('Error fetching available rooms:', error);
            }
        },
        validateStartDate() {
            const selectedDate = new Date(this.startDate);
            const today = new Date();

            if (!this.startDate) {
                this.errors.startDate = '(!) Заповніть початок бронювання';
                return false;
            } else if (selectedDate < today) {
                this.errors.startDate = '(!) Не можна обрати минулий час';
                return false;
            } else if (selectedDate > new Date('2026-01-01')) {
                this.errors.startDate = '(!) Максимальна дата 01.01.2026';
                return false;
            } else {
                this.errors.startDate = '';
                return true;
            }
        },
        validateEndDate() {
            const selectedDate = new Date(this.endDate);
            const start = new Date(this.startDate);
            const today = new Date();

            if (!this.endDate) {
                this.errors.endDate = '(!) Заповніть кінець бронювання';
                return false;
            } else if (selectedDate < today) {
                this.errors.endDate = '(!) Не можна обрати минулий час';
                return false;
            } else if (selectedDate > new Date('2026-01-01')) {
                this.errors.endDate = '(!) Максимальна дата 01.01.2026';
                return false;
            } else if (selectedDate < start) {
                this.errors.endDate = '(!) Не можна обрати дату перед початком бронювання';
                return false;
            } else {
                this.errors.endDate = '';
                return true;
            }
        },
        validateSelectedRoom() {
            if (!this.selectedRoom) {
                this.errors.selectedRoom = "(!) Оберіть кімнату"
                return false;
            } else {
                return true;
            }
        },
        validateNumberOfPeople() {
            if (!this.numberOfPeople) {
                this.errors.numberOfPeople = "(!) Оберіть кількість людей"
                return false;
            } else {
                return true;
            }

        },
        updateNumberOfPeople() {
            const selectedRoom = this.roomList.find(room => room.roomNumber === this.selectedRoom);
            if (selectedRoom) {
                this.peopleCountOptions = Array.from({length: selectedRoom.placesInRoom},
                    (_, index) => index + 1);
                this.numberOfPeople = 1;
            }
        },
    },
    mounted() {
        this.fetchData();
        this.fetchAvailableRooms();
    },
    computed: {
        minStartDate() {
            const today = new Date();
            return today.toISOString().split('T')[0];
        },
        minEndDate() {
            return this.startDate;
        },
    }
}