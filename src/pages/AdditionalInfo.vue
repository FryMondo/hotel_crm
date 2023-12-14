<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="addInfo">
      <h2>Додаткова інформація</h2>
      <div class="input-box">
        <label>Номер телефону:</label>
        <input v-model="phone" v-imask="'+{38}(\\000) 000-00-00'" type="text"
               @input="clearError('phone')" placeholder="+38(0__) ___-__-__">
        <div class="error-message" id="phone-error">{{ errors.phone }}</div>
      </div>
      <div class="input-box">
        <label>Прізвище:</label>
        <input v-model="surname" @input="clearError('surname')" type="text">
        <div class="error-message" id="surname-error">{{ errors.surname }}</div>
      </div>
      <div class="input-box">
        <label>Ім'я:</label>
        <input v-model="firstName" @input="clearError('firstName')" type="text">
        <div class="error-message" id="first-name-error">{{ errors.firstName }}</div>
      </div>
      <button type="submit">Додати інформацію</button>
      <button @click="$router.push('/')">Повернутися на головну сторінку</button>
    </form>
  </div>
  </body>
</template>

<script>
import {IMaskDirective} from "vue-imask";

export default {
  data() {
    return {
      phone: '',
      surname: '',
      firstName: '',
      errors: {}
    }
  },
  methods: {
    clearError(errorID) {
      delete this.errors[errorID];
    },
    async addInfo() {
      try {
        const username = localStorage.getItem('username');
        if (!username || !this.validatePhone() || !this.validateSurname() || !this.validateFirstName()) {
          return;
        }
        const responseAddInfo = await fetch('http://localhost:3000/addInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            phone: this.phone,
            surname: this.surname,
            firstName: this.firstName,
          }),
        });

        if (responseAddInfo.ok) {
          console.log("Information added successfully!");
        } else {
          console.error('Error:', responseAddInfo.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    validateSurname() {
      if (!this.surname.trim()) {
        this.errors.surname = '(!) Заповніть поле Прізвище';
        return false;
      } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(this.surname)) {
        this.errors.surname = '(!) Поле Прізвище не повинно містити цифри';
        return false;
      } else {
        return true;
      }
    },
    validateFirstName() {
      if (!this.firstName.trim()) {
        this.errors.firstName = '(!) Заповніть поле Ім\'я';
        return false;
      } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(this.firstName)) {
        this.errors.firstName = '(!) Поле Ім\'я не повинно містити цифри';
        return false;
      } else {
        return true;
      }
    },
    validatePhone() {
      if (this.phone.length >= 18) {
        return true;
      } else {
        this.errors.phone = '(!) Введіть всі цифри в номер';
        return false;
      }
    },
  },
  directives: {
    imask: IMaskDirective
  }
}
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

.register {
  font-size: .9em;
  color: black;
  text-align: center;
  margin: 25px 0 10px;
}

.register p a {
  text-decoration: none;
  color: black;
  font-weight: 600;
}

.register p a:hover {
  text-decoration: underline;
}
</style>