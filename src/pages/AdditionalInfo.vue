<template>
  <body>
  <div class="form-box">
    <form @submit.prevent="addInfo">
      <h2>Додаткова інформація</h2>
      <div class="input-box">

        <input v-model="phone" v-imask="'+{38}(\\000) 000-00-00'" type="text"
               @input="clearError('phone')" placeholder="+38(0__) ___-__-__">
        <label>Номер телефону:</label>
        <div class="error-message" id="phone-error">{{ errors.phone }}</div>

      </div>
      <div class="input-box">

        <input v-model="surname" @input="clearError('surname')" type="text">
        <label>Прізвище:</label>
        <div class="error-message" id="surname-error">{{ errors.surname }}</div>
      </div>
      <div class="input-box">

        <input v-model="firstName" @input="clearError('firstName')" type="text">
        <label>Ім'я:</label>
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
      const username = localStorage.getItem('username');
      if (!username || !this.validatePhone() || !this.validateSurname() || !this.validateFirstName()) {
        return;
      }
      const response = await fetch('http://localhost:3000/addInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          firstName: this.firstName,
          surname: this.surname,
          phone: this.phone
        })
      });
      this.firstName = '';
      this.surname = '';
      this.phone = '';
      if (response.ok) {
        console.log('User info updated successfully');
      } else {
        console.error('Failed to update user info');
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
  }
  ,
  directives: {
    imask: IMaskDirective
  }
}
</script>

<style scoped src="./styles/AddInfoStyle.css">
</style>