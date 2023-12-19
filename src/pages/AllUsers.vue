<template>
  <div class="main-btn">
    <button @click="$router.push('/')">На головну сторінку</button>
  </div>
  <div class="main-btn">
    <button @click="changeRoles">Змінити роль</button>
  </div>
  <div class="main-btn">
    <button @click="deleteUsers">Видалити користувача</button>
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
        <input type="checkbox" v-model="selectedUsers" :value="user.username"/>
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
  data() {
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
    async changeRoles() {
      if (this.selectedUsers.length === 0) {
        console.log('Виберіть хоча б одного користувача');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/updateRoles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            users: this.selectedUsers,
          }),
        });

        if (response.ok) {
          console.log('Ролі успішно змінені');
          this.fetchAllUsers();
        } else {
          console.error('Помилка при зміні ролей');
        }
      } catch (error) {
        console.error('Помилка при виконанні запиту:', error);
      }
    },
    async deleteUsers() {
      if (this.selectedUsers.length === 0) {
        return;
      }
      const confirmed = window.confirm('Ви впевнені, що хочете видалити обрані користувачі?');
      if (!confirmed) {
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/deleteUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usernames: this.selectedUsers,
          }),
        });
        if (response.ok) {
          await this.fetchAllUsers();
          console.log('Users deleted successfully');
        } else {
          console.error('Failed to delete users');
        }
      } catch (error) {
        console.error('Error deleting users:', error);
      }
    },
  },
  mounted() {
    this.fetchAllUsers();
    this.changeRoles();
  }
}
</script>

<style scoped src="./styles/AllUsersStyles.css"></style>