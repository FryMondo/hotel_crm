<template>
  <body>
    <div class="form-box">
      <form @submit.prevent="reserveRoom">
        <h2>Бронювання номеру</h2>
        <div class="input-box">
          <input
            v-model="startDate"
            @input="clearError('startDate')"
            type="date"
            :min="minStartDate"
          />
          <label>Початок бронювання:</label>
          <div class="error-message">{{ errors.startDate }}</div>
        </div>
        <div class="input-box">
          <input
            v-model="endDate"
            @input="clearError('endDate')"
            type="date"
            :min="minEndDate"
          />
          <label>Кінець бронювання:</label>
          <div class="error-message">{{ errors.endDate }}</div>
        </div>
        <div class="input-select">
          <label>Номер кімнати:</label>
          <select v-model="selectedRoom" @change="handleRoomChange">
            <option
              v-for="room in availableRooms"
              :key="room.roomNumber"
              :value="room.roomNumber"
            >
              {{ room.roomNumber }}
            </option>
          </select>
          <div class="error-message">{{ errors.selectedRoom }}</div>
        </div>
        <div class="input-select">
          <label>Кількість людей в кімнаті:</label>
          <select
            v-model="numberOfPeople"
            @change="clearError('numberOfPeople')"
          >
            <option
              v-for="count in peopleCountOptions"
              :key="count"
              :value="count"
            >
              {{ count }}
            </option>
          </select>
          <div class="error-message">{{ errors.numberOfPeople }}</div>
        </div>
        <button type="submit">Забронювати</button>
        <button @click="$router.push('/')">
          Повернутися на головну сторінку
        </button>
      </form>
    </div>
  </body>
</template>

<script>
import {
  validateStartDate,
  validateEndDate,
  validateSelectedRoom,
  validateNumberOfPeople,
} from '@/pages/validation/allValidation';

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
      availableRooms: [],
    };
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
        if (
          !username ||
          !this.validateStartDate() ||
          !this.validateEndDate() ||
          !this.validateSelectedRoom() ||
          !this.validateNumberOfPeople()
        ) {
          return;
        }

        const responseAddInfo = await fetch(
          'http://localhost:3000/reserveRoom',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usernameID: username,
              startDate: this.startDate,
              endDate: this.endDate,
              roomNumberID: this.selectedRoom,
              numberOfPeople: this.numberOfPeople,
            }),
          }
        );
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
      return validateStartDate(this.startDate, this.endDate, this.errors);
    },

    validateEndDate() {
      return validateEndDate(this.startDate, this.endDate, this.errors);
    },

    validateSelectedRoom() {
      return validateSelectedRoom(this.selectedRoom, this.errors);
    },

    validateNumberOfPeople() {
      return validateNumberOfPeople(this.numberOfPeople, this.errors);
    },
    updateNumberOfPeople() {
      const selectedRoom = this.roomList.find(
        (room) => room.roomNumber === this.selectedRoom
      );
      if (selectedRoom) {
        this.peopleCountOptions = Array.from(
          { length: selectedRoom.placesInRoom },
          (_, index) => index + 1
        );
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
  },
};
</script>

<style scoped src="./styles/ReserveStyle.css"></style>
