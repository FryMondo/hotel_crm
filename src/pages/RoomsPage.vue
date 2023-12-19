<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <div class="main-btn">
    <button @click="deleteRooms">Видалити кімнату</button>
  </div>
  <div class="title">
    <h1>НОМЕРА В ГОТЕЛІ:</h1>
  </div>
  <div class="form-box" v-if="isAdmin">
    <form @submit.prevent="submitForm">
      <h2>{{ formTitle }}</h2>
      <div class="input-box">
        <input v-model="roomNumber" @input="clearError('roomNumber')" type="number" min="1" max="150">
        <label>Номер кімнати: </label>
        <div class="error-message">{{ errors.roomNumber }}</div>
      </div>
      <div class="input-box">
        <input v-model="numberOfRooms" @input="clearError('numberOfRooms')" type="number" min="1" max="6">
        <label>Кількість кімнат: </label>
        <div class="error-message">{{ errors.numberOfRooms }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomArea" @input="clearError('roomArea')" type="number" min="25" max="70">
        <label>Площа кімнати: </label>
        <div class="error-message">{{ errors.roomArea }}</div>
      </div>
      <div class="input-box">
        <input v-model="placesInRoom" @input="clearError('placesInRoom')" type="number" min="1" max="5">
        <label>Кількість місць в номері: </label>
        <div class="error-message">{{ errors.placesInRoom }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomType" @input="clearError('roomType')" type="text">
        <label>Тип номеру: </label>
        <div class="error-message">{{ errors.roomType }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomCost" @input="clearError('roomCost')" type="number" min="250" max="10000">
        <label>Ціна кімнати: </label>
        <div class="error-message">{{ errors.roomCost }}</div>
      </div>
      <div class="input-box">
        <input v-model="description" @input="clearError('description')" type="text">
        <label>Опис номеру: </label>
        <div class="error-message">{{ errors.description }}</div>
      </div>
      <button type="submit">{{ submitButtonLabel }}</button>
    </form>
  </div>
  <table id="data-table">
    <thead>
    <tr>
      <th>Вибрати</th>
      <th>Номер кімнати</th>
      <th>Кількість кімнат</th>
      <th>Площа номеру</th>
      <th>Кількість місць в номері</th>
      <th>Тип номеру</th>
      <th>Ціна кімнати</th>
      <th>Опис номеру</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="room in rooms" :key="room.roomNumber">
      <td>
        <input type="checkbox" v-model="selectedRooms" :value="room.roomNumber"/>
      </td>
      <td>{{ room.roomNumber }}</td>
      <td>{{ room.numberOfRooms }}</td>
      <td>{{ room.roomArea }} м^3</td>
      <td>{{ room.placesInRoom }}</td>
      <td>{{ room.roomType }}</td>
      <td>{{ room.roomCost }}</td>
      <td>{{ room.description }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {
  validateRoomArea,
  validateDescription,
  validateRoomCost,
  validateRoomNumber,
  validateRoomType,
  validatePlacesInRoom,
  validateNumberOfRooms
} from "@/pages/validation/allValidation";

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
      role: '',
      isUpdate: false,
      selectedRooms: []
    }
  },
  methods: {
    async submitForm() {
      if (this.isUpdate) {
        await this.updateInformation();
      } else {
        await this.addInformation();
      }
    },
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
    async checkRoomNumber() {
      try {
        const response = await fetch(`http://localhost:3000/checkRoomNumber?roomNumber=${this.roomNumber}`);
        if (response.ok) {
          const result = await response.json();
          this.isUpdate = result.exists;
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async updateInformation() {
      if (!this.validateNumberOfRooms() || !this.validateRoomArea()
          || !this.validatePlacesInRoom() || !this.validateRoomType() || !this.validateRoomCost()
          || !this.validateDescription()) {
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/updateRoomInfo', {
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
    async deleteRooms() {
      if (this.selectedRooms.length === 0) {
        return;
      }
      const confirmed = window.confirm('Ви впевнені, що хочете видалити обрані кімнати?');
      if (!confirmed) {
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/deleteRooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomNumbers: this.selectedRooms,
          }),
        });
        if (response.ok) {
          await this.fetchData();
          console.log('Rooms deleted successfully');
        } else {
          console.error('Failed to delete rooms');
        }
      } catch (error) {
        console.error('Error deleting rooms:', error);
      }
    },
    validateRoomNumber() {
      return validateRoomNumber(this.rooms, this.roomNumber, this.errors);
    },
    validateNumberOfRooms() {
      return validateNumberOfRooms(this.numberOfRooms, this.errors);
    },
    validateRoomArea() {
      return validateRoomArea(this.roomArea, this.errors);
    },
    validatePlacesInRoom() {
      return validatePlacesInRoom(this.placesInRoom, this.errors);
    },
    validateRoomType() {
      return validateRoomType(this.roomType, this.errors);
    },
    validateRoomCost() {
      return validateRoomCost(this.roomCost, this.errors);
    },
    validateDescription() {
      return validateDescription(this.description, this.errors);
    },
  },
  mounted() {
    this.fetchData();
    this.fetchUserRole();
  },
  computed: {
    formTitle() {
      return this.isUpdate ? 'Оновити інформацію' : 'Додати номер в готель';
    },
    submitButtonLabel() {
      return this.isUpdate ? 'Оновити інформацію' : 'Додати інформацію';
    },
  },
  watch: {
    roomNumber() {
      this.checkRoomNumber();
    },
  },
}
</script>

<style scoped src="./styles/RoomsStyle.css">
</style>