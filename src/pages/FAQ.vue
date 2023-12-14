<template>
  <ul class="accordion">
    <li>
      <input type="radio" name="accordion" id="first" checked>
      <label for="first">Які способи оплати доступні на сайті?</label>
      <div class="content">
        <p>
          Ми приймаємо оплату через кредитні картки, PayPal та банківський переказ.
          Виберіть найзручніший для вас спосіб оплати проживання в номері.
        </p>
      </div>
    </li>
    <li>
      <input type="radio" name="accordion" id="second">
      <label for="second">Як зв'язатися з нашою службою підтримки?</label>
      <div class="content">
        <p>
          Для того щоб зв'язатися з нашою службою підтримки, ви можете перейти на
          сторінку Контакти, де будуть контакти служби підтримки.
        </p>
      </div>
    </li>
    <li>
      <input type="radio" name="accordion" id="third">
      <label for="third">Де можна отримати інформацію про номера та ціни на них?</label>
      <div class="content">
        <p>
          Щоб дізнатися які номери доступні та ціну на них, ви можете перейти на сторінку Номера
          та подивитися які є номери та ціни на них.
        </p>
      </div>
    </li>
    <div class="home-link">
      <button @click="$router.push('/')">На головну сторінку</button>
    </div>
  </ul>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

body {
  background: #e3edf7;
}

.accordion {
  margin: 60px auto;
  width: 600px;
}

.accordion li {
  list-style: none;
  width: 100%;
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
  background: #e3edf7;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
  -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}

@media (max-width: 1170px) {
  .accordion {
    width: 93%;
  }

  .accordion li {
    width: 93%;
  }

  .home-link {
    width: 93% !important;
  }
}

.accordion li label {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}

label::before {
  content: '+';
  margin-right: 10px;
  font-size: 24px;
  font-weight: 600;
}

input[type="radio"] {
  display: none;
}

.accordion .content {
  color: #555;
  padding: 0 10px;
  line-height: 26px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s, padding 0.5s;
}

.accordion input[type="radio"]:checked + label + .content {
  max-height: 400px;
  padding: 10px 10px 20px;
}

.accordion input[type="radio"]:checked + label::before {
  content: '-';
}

.home-link {
  width: 100%;
  display: block;
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  text-decoration: none;
  margin: 20px;
  padding: 15px;
  border-radius: 5px;
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