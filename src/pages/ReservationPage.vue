<template>
  <body>
  <div class="form-box">
    <form>
      <h2>Бронювання номеру</h2>
      <div class="input-box">
        <input type="date" required>
        <label>Початок бронювання:</label>
      </div>
      <div class="input-box">
        <input type="date" required>
        <label>Кінець бронювання:</label>
      </div>
      <div class="input-box">
        <input type="number" required>
        <label>Номер кімнати:</label>
      </div>
      <div class="input-box">
        <input type="number" required>
        <label>Кількість людей в кімнаті:</label>
      </div>
      <button @click="$router.push('/')">Забронювати</button>
    </form>
  </div>
  </body>
</template>
<script>
export default {}
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
</style>