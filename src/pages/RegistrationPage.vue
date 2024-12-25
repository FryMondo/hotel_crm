<template>
  <body>
    <div class="form-box">
      <form @submit.prevent="registerUser">
        <h2>Реєстрація</h2>
        <div class="input-box">
          <input v-model="email" @input="clearError('email')" type="text" />
          <label>Email:</label>
          <div class="error-message" id="email-error">{{ errors.email }}</div>
        </div>
        <div class="input-box">
          <input
            v-model="username"
            @input="clearError('username')"
            type="text"
          />
          <label>Username:</label>
          <div class="error-message" id="email-error">
            {{ errors.username }}
          </div>
        </div>
        <div class="input-box">
          <input
            v-model="password"
            @input="clearError('password')"
            type="password"
          />
          <label>Пароль:</label>
          <div class="error-message" id="email-error">
            {{ errors.password }}
          </div>
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  </body>
</template>

<script>
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '@/pages/validation/allValidation';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      errors: {},
    };
  },
  methods: {
    async registerUser() {
      if (
        !this.validateEmail() ||
        !this.validateUsername() ||
        !this.validatePassword()
      ) {
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          localStorage.setItem('username', this.username);
          this.$router.push('/');
        } else {
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    clearError(errorID) {
      delete this.errors[errorID];
    },
    validateEmail() {
      return validateEmail(this.email, this.errors);
    },
    validatePassword() {
      return validatePassword(this.password, this.errors);
    },
    validateUsername() {
      return validateUsername(this.username, this.errors);
    },
  },
};
</script>

<style scoped src="./styles/RegistrStyle.css"></style>
