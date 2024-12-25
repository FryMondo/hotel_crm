<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <div class="form-box">
    <form @submit.prevent="changeReserve">
      <h2>Зміна бронювання</h2>
      <div class="input-select">
        <label>Номер кімнати</label>
        <select v-model="selectedRoom" @change="handleRoomChange">
          <option
            v-for="room in reserved"
            :key="room.roomNumberID"
            :value="room.roomNumberID"
          >
            {{ room.roomNumberID }}
          </option>
        </select>
        <div class="error-message">{{ errors.selectedRoom }}</div>
      </div>
      <div class="input-select">
        <label>Кількість людей в кімнаті</label>
        <select v-model="numberOfPeople" @change="clearError('numberOfPeople')">
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
      <div class="input-box">
        <input
          v-model="startDate"
          @input="clearError('startDate')"
          type="date"
          :min="minStartDate"
        />
        <label>Початок бронювання</label>
        <div class="error-message">{{ errors.startDate }}</div>
      </div>
      <div class="input-box">
        <input
          v-model="endDate"
          @input="clearError('endDate')"
          type="date"
          :min="minEndDate"
        />
        <label>Кінець бронювання</label>
        <div class="error-message">{{ errors.endDate }}</div>
      </div>
      <button type="submit">Змінити бронювання</button>
    </form>
  </div>
  <table id="data-table">
    <thead>
      <tr>
        <th>Початок бронювання</th>
        <th>Кінець бронювання</th>
        <th>Кількість людей</th>
        <th>Номер кімнати</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="room in reserved" :key="room.roomNumber">
        <td>{{ formatDate(room.startDate) }}</td>
        <td>{{ formatDate(room.endDate) }}</td>
        <td>{{ room.numberOfPeople }}</td>
        <td>{{ room.roomNumberID }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {
  validateEndDate,
  validateNumberOfPeople,
  validateSelectedRoom,
  validateStartDate,
} from '@/pages/validation/allValidation';

export default {
  data() {
    return {
      reserved: [],
      startDate: '',
      endDate: '',
      numberOfPeople: 1,
      selectedRoom: '',
      roomList: [],
      peopleCountOptions: [],
      errors: {},
    };
  },
  methods: {
    async fetchReservedData() {
      const usernameID = localStorage.getItem('username');
      try {
        const response = await fetch(
          `http://localhost:3000/getReserved?usernameID=${usernameID}`
        );
        if (response.ok) {
          this.reserved = await response.json();
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async changeReserve() {
      try {
        if (
          !this.validateStartDate() ||
          !this.validateEndDate() ||
          !this.validateSelectedRoom() ||
          !this.validateNumberOfPeople()
        ) {
          return;
        }
        const responseAddInfo = await fetch(
          'http://localhost:3000/updateReservation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
        await this.fetchReservedData();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async fetchRoomsPlaces() {
      try {
        const response = await fetch('http://localhost:3000/getReservedInfo');
        if (response.ok) {
          this.roomList = await response.json();
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    },
    clearError(errorID) {
      delete this.errors[errorID];
    },
    handleRoomChange() {
      this.updateNumberOfPeople();
      this.clearError('selectedRoom');
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
        (room) => room.roomNumberID === this.selectedRoom
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
    this.fetchReservedData();
    this.fetchRoomsPlaces();
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

<style scoped src="./styles/ReservedStyles.css"></style>
