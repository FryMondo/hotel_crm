<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="loginUser">
      <h2>Логін</h2>
      <div class="input-box">
        <input v-model="form.email" @input="clearError('email')" type="email">
        <label>Email:</label>
        <div class="error-message" id="email-error">{{ errors.email }}</div>
      </div>
      <div class="input-box">
        <input v-model="form.password" @input="clearError('password')" type="password">
        <label>Пароль:</label>
        <div class="error-message" id="password-error">{{ errors.password }}</div>
      </div>
      <button type="submit">Увійти</button>
      <div class="register">
        <p>Ще немає акаунта? <strong @click="$router.push('/registration')">Реєстрація</strong></p>
      </div>
    </form>
  </div>
  </body>
</template>

<script src="./js/LoginJS.js"></script>

<style scoped src="./styles/LoginStyle.css"></style>