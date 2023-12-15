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

<script>
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
      if (!this.validateEmail() || !this.validateUsername() || !this.validatePassword()) {
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
      if (!this.email.trim()) {
        this.errors.email = '(!) Заповніть поле Email';
        return false;
      } else if (!this.RegExpEmail(this.email)) {
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
      if (!this.password.trim()) {
        this.errors.password = '(!) Заповніть поле Пароль';
        return false;
      } else if (this.password.trim().length < 8) {
        this.errors.password = '(!) Пароль повинен містити мінімум 8 символів';
        return false;
      } else if (/\s/.test(this.password)) {
        this.errors.password = '(!) Пароль не повинен містити пробіли';
        return false;
      } else if (!/[a-zа-яёіїє]/.test(this.password)) {
        this.errors.password = '(!) Пароль повинен містити 1 маленьку літеру';
        return false;
      } else if (!/[A-ZА-ЯЁІЇЄ]/.test(this.password)) {
        this.errors.password = '(!) Пароль повинен містити 1 велику літеру';
        return false;
      } else {
        return true;
      }
    },
    validateUsername() {
      if (!this.username.trim()) {
        this.errors.username = '(!) Заповніть поле Username';
        return false;
      } else if (this.username.trim().length < 3) {
        this.errors.username = '(!) Username повинен мати хоча б 3 символи';
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

.error-message {
  color: rgb(255, 0, 0);
  position: absolute;
  top: 110%;
  font-size: 1em;
  width: 400px;
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
</style>