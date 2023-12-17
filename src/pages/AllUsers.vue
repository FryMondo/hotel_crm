<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <table id="data-table">
    <thead>
    <tr>
      <th>Вибрати</th>
      <th>Email</th>
      <th>Username</th>
      <th>Роль</th>
      <th>Телефон</th>
      <th>Прізвище</th>
      <th>Ім'я</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.username">
      <td>
        <input type="checkbox" v-model="selectedUsers" :value="user.username" />
      </td>
      <td>{{ user.email }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.role }}</td>
      <td>{{ user.phone || 'Порожньо' }}</td>
      <td>{{ user.surname || 'Порожньо' }}</td>
      <td>{{ user.firstName || 'Порожньо' }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data(){
    return {
      users: [],
      selectedUsers: []
    }
  },
  methods: {
    async fetchAllUsers() {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/getAllUsers?username=${username}`);
        if (response.ok) {
          this.users = await response.json();
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  mounted() {
    this.fetchAllUsers()
  }
}
</script>

<style scoped src="./styles/AllUsersStyles.css"></style>