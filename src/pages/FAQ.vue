<template>
  <ul class="accordion">
    <li>
      <input type="radio" name="accordion" id="first" checked />
      <label for="first">Які способи оплати доступні на сайті?</label>
      <div class="content">
        <p>
          Ми приймаємо оплату через кредитні картки, PayPal та банківський
          переказ. Виберіть найзручніший для вас спосіб оплати проживання в
          номері.
        </p>
      </div>
    </li>
    <li>
      <input type="radio" name="accordion" id="second" />
      <label for="second">Як зв'язатися з нашою службою підтримки?</label>
      <div class="content">
        <p>
          Для того щоб зв'язатися з нашою службою підтримки, ви можете перейти
          на сторінку Контакти, де будуть контакти служби підтримки.
        </p>
      </div>
    </li>
    <li>
      <input type="radio" name="accordion" id="third" />
      <label for="third"
        >Де можна отримати інформацію про номера та ціни на них?</label
      >
      <div class="content">
        <p>
          Щоб дізнатися які номери доступні та ціну на них, ви можете перейти на
          сторінку Номера та подивитися які є номери та ціни на них.
        </p>
      </div>
    </li>
    <div class="home-link">
      <button @click="$router.push('/')">На головну сторінку</button>
    </div>
  </ul>
</template>

<style scoped src="./styles/FAQStyle.css"></style>
