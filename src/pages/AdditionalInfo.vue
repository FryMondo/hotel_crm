<template>
  <body>
    <div class="form-box">
      <form @submit.prevent>
        <h2>Додаткова інформація</h2>
        <div class="input-box">
          <input
            v-model="phone"
            v-imask="'+{38}(\\000) 000-00-00'"
            type="text"
            @input="clearError('phone')"
            placeholder="+38(0__) ___-__-__"
          />
          <label>Номер телефону:</label>
          <div class="error-message" id="phone-error">{{ errors.phone }}</div>
        </div>
        <div class="input-box">
          <input v-model="surname" @input="clearError('surname')" type="text" />
          <label>Прізвище:</label>
          <div class="error-message" id="surname-error">
            {{ errors.surname }}
          </div>
        </div>
        <div class="input-box">
          <input
            v-model="firstName"
            @input="clearError('firstName')"
            type="text"
          />
          <label>Ім'я:</label>
          <div class="error-message" id="first-name-error">
            {{ errors.firstName }}
          </div>
        </div>
        <button v-if="hasUserInfo" type="submit" @click="updateInfo">
          Оновити інформацію
        </button>
        <button v-else type="submit" @click="addInfo">Додати інформацію</button>
        <button @click="$router.push('/')">
          Повернутися на головну сторінку
        </button>
      </form>
    </div>
  </body>
</template>

<script>
import { IMaskDirective } from 'vue-imask';
import {
  validateSurname,
  validateFirstName,
  validatePhone,
} from '@/pages/validation/allValidation';

export default {
  data() {
    return {
      phone: '',
      surname: '',
      firstName: '',
      errors: {},
      hasUserInfo: false,
    };
  },
  methods: {
    clearError(errorID) {
      delete this.errors[errorID];
    },
    async addInfo() {
      const username = localStorage.getItem('username');
      if (
        !username ||
        !this.validatePhone() ||
        !this.validateSurname() ||
        !this.validateFirstName()
      ) {
        return;
      }
      const response = await fetch('http://localhost:3000/addInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          firstName: this.firstName,
          surname: this.surname,
          phone: this.phone,
        }),
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
    async checkUserInfo() {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(
          `http://localhost:3000/checkUserInfo?username=${username}`
        );
        if (response.ok) {
          const result = await response.json();
          this.hasUserInfo = result.hasUserInfo;
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async updateInfo() {
      const username = localStorage.getItem('username');
      if (
        !username ||
        !this.validatePhone() ||
        !this.validateSurname() ||
        !this.validateFirstName()
      ) {
        return;
      }
      const response = await fetch('http://localhost:3000/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          firstName: this.firstName,
          surname: this.surname,
          phone: this.phone,
        }),
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
      return validateSurname(this.surname, this.errors);
    },
    validateFirstName() {
      return validateFirstName(this.firstName, this.errors);
    },
    validatePhone() {
      return validatePhone(this.phone, this.errors);
    },
  },
  mounted() {
    this.checkUserInfo();
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style scoped src="./styles/AddInfoStyle.css"></style>
