<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="reserveRoom">
      <h2>Бронювання номеру</h2>
      <div class="input-box">

        <input v-model="startDate" @input="clearError('startDate')" type="date" :min="minStartDate">
        <label>Початок бронювання:</label>
        <div class="error-message">{{ errors.startDate }}</div>
      </div>
      <div class="input-box">

        <input v-model="endDate" @input="clearError('endDate')" type="date" :min="minEndDate">
        <label>Кінець бронювання:</label>
        <div class="error-message">{{ errors.endDate }}</div>
      </div>
      <div class="input-select">
        <label>Номер кімнати:</label>
        <select v-model="selectedRoom" @change="handleRoomChange">
          <option v-for="room in availableRooms" :key="room.roomNumber" :value="room.roomNumber">
            {{ room.roomNumber }}
          </option>
        </select>

        <div class="error-message">{{ errors.selectedRoom }}</div>
      </div>
      <div class="input-select">
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

<script src="./js/ReserveJS.js"></script>

<style scoped src="./styles/ReserveStyle.css">
</style>