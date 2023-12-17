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

<script>
import axios from "axios";
import {
  validateEmail,
  validatePassword
} from "@/pages/validation/allValidation";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  methods: {
    async loginUser() {
      if (!this.validateEmail() || !this.validatePassword()) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/login', this.form);
        if (response.data.success) {
          localStorage.setItem('username', response.data.username);
          this.$router.push('/');
        } else {
          if (response.data.message.includes('пошта')) {
            this.errors.email = response.data.message;
          } else if (response.data.message.includes('пароль')) {
            this.errors.password = response.data.message;
          }
        }
      } catch (error) {
        console.error('Помилка авторизації:', error);
      }
    },
    clearError(errorID) {
      delete this.errors[errorID];
    },
    validateEmail() {
      return validateEmail(this.form.email, this.errors);
    },
    validatePassword() {
      return validatePassword(this.form.password, this.errors);
    },
  },
};
</script>

<style scoped src="./styles/LoginStyle.css"></style>