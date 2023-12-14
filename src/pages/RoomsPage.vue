<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <div class="form-box">
    <form @submit.prevent="addInformation">
      <h2>Додати номер в готель: </h2>
      <div class="input-box">
        <label>Номер кімнати: </label>
        <input v-model="roomNumber" @input="clearError('roomNumber')" type="number">
        <div class="error-message">{{ errors.roomNumber }}</div>
      </div>
      <div class="input-box">
        <label>Кількість кімнат: </label>
        <input v-model="numberOfRooms" @input="clearError('numberOfRooms')" type="number">
        <div class="error-message">{{ errors.numberOfRooms }}</div>
      </div>
      <div class="input-box">
        <label>Площа кімнати: </label>
        <input v-model="roomArea" @input="clearError('roomArea')" type="number">
        <div class="error-message">{{ errors.roomArea }}</div>
      </div>
      <div class="input-box">
        <label>Кількість місць в номері: </label>
        <input v-model="placesInRoom" @input="clearError('placesInRoom')" type="number">
        <div class="error-message">{{ errors.placesInRoom }}</div>
      </div>
      <div class="input-box">
        <label>Тип номеру: </label>
        <input v-model="roomType" @input="clearError('roomType')" type="text">
        <div class="error-message">{{ errors.roomType }}</div>
      </div>
      <div class="input-box">
        <label>Ціна кімнати: </label>
        <input v-model="roomCost" @input="clearError('roomCost')" type="number">
        <div class="error-message">{{ errors.roomCost }}</div>
      </div>
      <div class="input-box">
        <label>Опис номеру: </label>
        <input v-model="description" @input="clearError('description')" type="text">
        <div class="error-message">{{ errors.description }}</div>
      </div>
      <button type="submit">Додати інформацію</button>
    </form>
  </div>
  <table id="data-table">
    <thead>
    <tr>
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
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
.form-box {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  position: absolute;
  width: 12%;
  margin-top: 10px;
}

h2 {
  font-size: 2em;
  color: black;
  text-align: center;
}

.input-box {
  position: relative;
  margin: 30px 0;
  width: 290px;
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

.error-message {
  color: rgb(255, 0, 0);
  position: absolute;
  top: 110%;
  font-size: 1em;
  width: 400px;
}

.main-btn {
  width: 340px;
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
}

table {
  width: 60%;
  margin-left: 100px;
  padding: 30px;
  min-height: 90px;
  border-radius: 10px;
  border-color: #fff;
}

th {
  border-radius: 10px;
  border: 2px solid #fff;
  height: 40px;

}
</style>