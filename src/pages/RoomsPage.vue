<template>
  <div class="add-information">
    <form @submit.prevent="addInformation">
      <div class="room-number">
        <label>Номер кімнати: </label>
        <input v-model="roomNumber" type="number">
        <div class="error-message" v-if="roomNumberError">{{ roomNumberError }}</div>
      </div>
      <div class="rooms">
        <label>Кількість кімнат: </label>
        <input v-model="numberOfRooms" type="number">
      </div>
      <div class="area">
        <label>Площа кімнати: </label>
        <input v-model="roomArea" type="number">
      </div>
      <div class="places">
        <label>Кількість місць в номері: </label>
        <input v-model="placesInRoom" type="number">
      </div>
      <div class="room-type">
        <label>Тип номеру: </label>
        <input v-model="roomType" type="text">
      </div>
      <div class="cost">
        <label>Ціна кімнати: </label>
        <input v-model="roomCost" type="number">
      </div>
      <div class="description">
        <label>Опис номеру: </label>
        <input v-model="description" type="text">
      </div>
      <div class="add-btn">
        <button type="submit">Додати інформацію</button>
      </div>
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
      <td>{{ room.roomArea }}</td>
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
      roomNumber: '',
      numberOfRooms: '',
      roomArea: '',
      placesInRoom: '',
      description: '',
      roomType: '',
      roomCost: '',
      rooms: [],
      roomNumberError: ''
    }
  },
  methods: {
    async addInformation(){
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
        const isRoomNumberExists = this.rooms.some(room => room.roomNumber === this.roomNumber);
        if (isRoomNumberExists) {
          this.roomNumberError = '(!) Такий номер вже існує';
          return;
        }
        await this.fetchData();
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
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
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