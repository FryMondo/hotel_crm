<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="reserveRoom">
      <h2>Бронювання номеру</h2>
      <div class="input-box">
        <label>Початок бронювання:</label>
        <input v-model="startDate" @input="clearError('startDate')" type="date" :min="minStartDate">
        <div class="error-message">{{ errors.startDate }}</div>
      </div>
      <div class="input-box">
        <label>Кінець бронювання:</label>
        <input v-model="endDate" @input="clearError('endDate')" type="date" :min="minEndDate">
        <div class="error-message">{{ errors.endDate }}</div>
      </div>
      <div class="input-box">
        <label>Номер кімнати:</label>
        <select v-model="selectedRoom" @change="handleRoomChange">
          <option v-for="room in roomList" :key="room.roomNumber" :value="room.roomNumber">
            {{ room.roomNumber }}
          </option>
        </select>
        <div class="error-message">{{ errors.selectedRoom }}</div>
      </div>
      <div class="input-box">
        <label>Кількість людей в кімнаті:</label>
        <select v-model="numberOfPeople" @change="clearError('numberOfPeople')">
          <option v-for="count in peopleCountOptions" :key="count" :value="count">
            {{ count }}
          </option>
        </select>
        <div class="error-message">{{ errors.numberOfPeople }}</div>
      </div>
      <button type="submit">Забронювати</button>
      <button @click="$router.push('/')">Повернутися на головну сторінку</button>
    </form>
  </div>
  </body>
</template>
<script>
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
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-box {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  width: 13%;
}

h2 {
  font-size: 2em;
  color: black;
  text-align: center;
}

.input-box {
  position: relative;
  margin: 30px 0;
  width: 310px;
  border-bottom: 2px solid black;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: black;
  font-size: 1em;
  pointer-events: none;
  transition: .5s;
}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
}

button {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: black;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  margin: 5px;
}

.error-message {
  color: rgb(255, 0, 0);
  position: absolute;
  top: 110%;
  font-size: 1em;
  width: 400px;
}
</style>