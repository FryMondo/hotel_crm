<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
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
export default {
  data() {
    return {
      reserved: []
    }
  },
  methods: {
    async fetchData() {
      const usernameID = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/getReserved?usernameID=${usernameID}`);
        if (response.ok) {
          this.reserved = await response.json();
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
  },
  mounted() {
    this.fetchData();
  }

}
</script>

<style scoped src="./styles/ReservedStyles.css">

</style>