<template>
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
      <td>{{ room.startDate }}</td>
      <td>{{ room.endDate }}</td>
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
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/getReserved?username=${username}`);
        if (response.ok) {
          this.reserved = await response.json();
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

<style scoped src="./styles/ReservedStyles.css">

</style>