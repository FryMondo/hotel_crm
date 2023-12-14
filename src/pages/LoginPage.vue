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
      if (!this.form.email.trim()) {
        this.errors.email = '(!) Заповніть поле Email';
        return false;
      } else if (!this.RegExpEmail(this.form.email)) {
        this.errors.email = '(!) Невірний формат Email';
        return false;
      } else {
        return true;
      }
    },
    RegExpEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    },
    validatePassword() {
      if (!this.form.password.trim()) {
        this.errors.password = '(!) Заповніть поле Пароль';
        return false;
      } else if (this.form.password.trim().length < 8) {
        this.errors.password = '(!) Пароль повинен містити мінімум 8 символів';
        return false;
      } else if (/\s/.test(this.form.password)) {
        this.errors.password = '(!) Пароль не повинен містити пробіли';
        return false;
      } else if (!/[a-zа-яёіїє]/.test(this.form.password)) {
        this.errors.password = '(!) Пароль повинен містити 1 маленьку літеру';
        return false;
      } else if (!/[A-ZА-ЯЁІЇЄ]/.test(this.form.password)) {
        this.errors.password = '(!) Пароль повинен містити 1 велику літеру';
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-box {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

h2 {
  font-size: 2em;
  color: black;
  text-align: center;
}

.input-box {
  position: relative;
  margin: 30px 0;
  width: 310px;
  border-bottom: 2px solid black;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: black;
  font-size: 1em;
  pointer-events: none;
  transition: .5s;
}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
}

button {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: black;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
}

.error-message {
  color: rgb(255, 0, 0);
  position: absolute;
  top: 110%;
  font-size: 1em;
  width: 400px;
}
</style>