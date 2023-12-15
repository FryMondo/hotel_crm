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

<script src="./js/AddInfoJS.js">

</script>

<style scoped src="./styles/AddInfoStyle.css">
</style>