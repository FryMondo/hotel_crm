<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <div class = "title">
    <h1>НОМЕРА В ГОТЕЛІ:</h1>
  </div>
  <div class="form-box" v-if="isAdmin">
    <form @submit.prevent="addInformation">
      <h2>Додати номер в готель: </h2>
      <div class="input-box">
        <input v-model="roomNumber" @input="clearError('roomNumber')" type="number" min = "1" max = "150">
        <label>Номер кімнати: </label>
        <div class="error-message">{{ errors.roomNumber }}</div>
      </div>
      <div class="input-box">
        <input v-model="numberOfRooms" @input="clearError('numberOfRooms')" type="number" min = "1" max = "6">
        <label>Кількість кімнат: </label>
        <div class="error-message">{{ errors.numberOfRooms }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomArea" @input="clearError('roomArea')" type="number" min = "25" max = "70">
        <label>Площа кімнати: </label>
        <div class="error-message">{{ errors.roomArea }}</div>
      </div>
      <div class="input-box">
        <input v-model="placesInRoom" @input="clearError('placesInRoom')" type="number" min = "1" max = "5">
        <label>Кількість місць в номері: </label>
        <div class="error-message">{{ errors.placesInRoom }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomType" @input="clearError('roomType')" type="text">
        <label>Тип номеру: </label>
        <div class="error-message">{{ errors.roomType }}</div>
      </div>
      <div class="input-box">
        <input v-model="roomCost" @input="clearError('roomCost')" type="number" min = "250" max = "10000">
        <label>Ціна кімнати: </label>
        <div class="error-message">{{ errors.roomCost }}</div>
      </div>
      <div class="input-box">
        <input v-model="description" @input="clearError('description')" type="text">
        <label>Опис номеру: </label>
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

<script src="./js/RoomsJS.js"></script>

<style scoped src="./styles/RoomsStyle.css">
</style>