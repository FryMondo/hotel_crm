<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="registerUser">
      <h2>Реєстрація</h2>
      <div class="input-box">
        <input v-model="email" @input="clearError('email')" type="text">
        <label>Email:</label>
        <div class="error-message" id="email-error">{{ errors.email }}</div>
      </div>
      <div class="input-box">
        <input v-model="username" @input="clearError('username')" type="text">
        <label>Username:</label>
        <div class="error-message" id="email-error">{{ errors.username }}</div>
      </div>
      <div class="input-box">
        <input v-model="password" @input="clearError('password')" type="password">
        <label>Пароль:</label>
        <div class="error-message" id="email-error">{{ errors.password }}</div>
      </div>
      <button type="submit">Зареєструватися</button>
    </form>
  </div>
  </body>
</template>

<script src="./js/RegistrJS.js"></script>

<style scoped src="./styles/RegistrStyle.css">
</style>