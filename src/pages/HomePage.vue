<template>
  <div class="navbar">
    <button><strong>Hotel</strong></button>
    <div class="navigation-wrapper">
      <button class="navigation-btn"><strong>Навігація</strong></button>
      <div class="navigation-menu">
        <button><strong>Вітання</strong></button>
        <hr>
        <button><strong>Інформація</strong></button>
        <hr>
        <button><strong>Розташування</strong></button>
      </div>
    </div>
    <button @click="$router.push('/FAQ')"><strong>FAQ</strong></button>
    <button @click="$router.push('/reservation')"><strong>Бронювання</strong></button>
    <button @click="$router.push('/rooms')"><strong>Кімнати</strong></button>
    <div class="navigation-wrapper">
      <button class="navigation-btn"><strong>{{showUsername()}}</strong></button>
      <div class="navigation-menu">
        <button><strong>Заброньовані номери</strong></button>
        <hr>
        <button @click="$router.push('/additional')"><strong>Додати інформацію</strong></button>
        <hr>
        <div class="secret" v-if="isAdmin">
          <button><strong>Користувачі</strong></button>
          <hr>
        </div>
        <button @click="$router.push('/login')"><strong>Вийти</strong></button>
      </div>
    </div>
  </div>
  <div class="welcome-text">
    <p><strong>Вітаємо вас, {{showUsername()}}, на сторінці нашого готелю!</strong></p>
  </div>
  <hr class="welcome-line">
  <div class="hotel_info">
    <div class="info-title">
      <p><strong>Інформація про готель</strong></p>
    </div>
    <div class="info-content">
      <div class="image-container">
        <transition name="fade" mode="out-in">
          <img :key="currentImageHotel" :src="currentImageHotel" :alt="altTextHotel" class="hotel-image"/>
        </transition>
      </div>
      <div class="text-container">
        <p>Чотирьохзірковий Готель Україна розташований у серці Києва – на Майдані Незалежності. Це унікальне місце,
          де перетинаються культурне, політичне та розважальне життя української столиці. Неподалік розташовані
          найвідоміші київські театри, Секретаріат Президента України, Верховна Рада, Кабінет Міністрів,
          Національний банк, мерія, головпоштамт, нічні клуби та великі торговельні центри.</p>
      </div>
    </div>
  </div>
  <hr class="info-line">
  <div class="hotel_info">
    <div class="info-title">
      <p><strong>Інформація про кімнати</strong></p>
    </div>
    <div class="info-content">
      <div class="text-container">
        <ul>
          <li>В готелі «Україна» є обладнане бомбосховище з безкоштовним Wi-Fi, туалетом, душем, TV,
            та окремим виходом на вулицю.
          </li>
          <li>Система оповіщення про повітряну тривогу або іншу небезпеку.</li>
          <li>Проінструктований персонал щодо дій у разі екстреної ситуації.</li>
          <li>Усі номери оснащені датчиками диму та системою пожежогасіння.</li>
          <li>Цілодобова охорона та відеоспостереження.</li>
        </ul>
      </div>
      <div class="image-container">
        <transition name="fade" mode="out-in">
          <img :key="currentImageRoom" :src="currentImageRoom" :alt="altTextRoom" class="hotel-image"/>
        </transition>
      </div>
    </div>
  </div>
  <hr class="info-line">
  <div class="placement">
    <div class="info-title">
      <p><strong>Де розташований готель?</strong></p>
    </div>
    <div class="address">
      <p>Готель знаходиться за такою адресою: <strong>м. Київ, вул. Інститутська, 4</strong></p>
    </div>
    <div class="map">
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.599071102534!2d30.524697976557064!3d50.44856817159185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce53dbbdc391%3A0x71aa7c1dce2058dc!2z0JPQvtGC0LXQu9GMINCj0LrRgNCw0ZfQvdCw!5e0!3m2!1suk!2sua!4v1700596919974!5m2!1suk!2sua"
          allowfullscreen
      ></iframe>
    </div>
  </div>
  <div class="footer">
    <div class="contacts">
      <p><strong>Контакти</strong></p>
      <p><a href="tel:+380123456789">+38(012) 345-67-89</a></p>
      <p><a href="tel:+380987654321">+38(098) 765-43-21</a></p>
    </div>
    <div class="groups">
      <p><strong>Соц. мережі</strong></p>
      <p><a href="https://www.instagram.com/" target="_blank">
        <img src="../../public/pictures/social/instagram.png" alt="instagram"/></a></p>
      <p><a href="https://t.me/" target="_blank">
        <img src="../../public/pictures/social/telegram.png" alt="telegram"/></a></p>
      <p><a href="https://www.facebook.com/" target="_blank">
        <img src="../../public/pictures/social/facebook.png" alt="facebook"/></a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesHotel: ["./pictures/hotel_info/main_hotel1.jpeg", "./pictures/hotel_info/main_hotel2.jpeg",
        "./pictures/hotel_info/main_hotel3.jpeg", "./pictures/hotel_info/main_hotel4.jpeg"],
      imagesRoom: ["./pictures/room_info/main_room1.jpg", "./pictures/room_info/main_room2.jpg",
        "./pictures/room_info/main_room3.jpg"],
      currentImageIndex: 0,
      intervalId: null,
      isAdmin: false,
      role: ''
    };
  },
  computed: {
    currentImageHotel() {
      return this.imagesHotel[this.currentImageIndex];
    },
    currentImageRoom() {
      return this.imagesRoom[this.currentImageIndex];
    },
    altTextHotel() {
      return `Hotel Image ${this.currentImageIndex + 1}`;
    },
    altTextRoom() {
      return `Room Image ${this.currentImageIndex + 1}`;
    },
  },
  mounted() {
    this.startImageRotationHotel();
    this.startImageRotationRoom();
    this.fetchUserRole();
  },
  beforeUnmount() {
    this.stopImageRotation();
  },
  methods: {
    async fetchUserRole() {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:3000/getUserRole?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          this.role = data[0].role;
          this.isAdmin = this.role === "ADMIN";
        } else {
          console.error('Server response not OK');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    showUsername(){
      return localStorage.getItem('username');
    },
    startImageRotationHotel() {
      this.intervalId = setInterval(this.rotateImageHotel, 5000);
    },
    startImageRotationRoom() {
      this.intervalId = setInterval(this.rotateImageRoom, 5000);
    },
    stopImageRotation() {
      clearInterval(this.intervalId);
    },
    rotateImageHotel() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imagesHotel.length;
    },
    rotateImageRoom() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imagesRoom.length;
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: -8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 20px;
}

.navbar button {
  background-color: white;
  padding: 8px 15px;
  font-size: 20px;
  border-radius: 15px;
}

.navigation-btn {
  width: 145px;
}

.navigation-wrapper {
  position: relative;
}

.navigation-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.navigation-wrapper:hover .navigation-menu,
.navigation-btn:hover + .navigation-menu {
  display: block;
}

.navigation-menu button {
  display: block;
  width: 100%;
  padding: 8px 15px;
  font-size: 16px;
  text-align: left;
  border: none;
  background-color: white;
}

.welcome-text {
  position: absolute;
  top: 12%;
  left: 32%;
  text-align: center;
  font-size: 48px;
}

.welcome-line {
  margin-top: 312px;
  width: 100%;
  border-top: 1px solid black;
}

.hotel_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.info-title {
  text-align: center;
  font-size: 48px;
  margin-bottom: 20px;
}

.info-content {
  display: flex;
  width: 70%;
}

.image-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
}

.hotel-image {
  height: 440px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.text-container {
  width: 50%;
  font-size: 26px;
  padding: 25px;
}

.text-container li {
  font-size: 26px;
  padding: 10px;
}

.info-line {
  margin-top: 150px;
  width: 100%;
  border-top: 1px solid black;
}

.address {
  text-align: center;
  font-size: 26px;
  margin-bottom: 20px;
}

.map {
  text-align: center;
  margin-top: 20px;
}

iframe {
  width: 720px;
  height: 540px;
  border: 0;
}

.footer {
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin: 50px -8px -8px;
}

.contacts, .groups {
  text-align: center;
}

.contacts p, .groups p {
  margin: 0;
  font-size: 22px;
}

.contacts strong, .groups strong {
  font-size: 25px;
}

.contacts a, .groups a {
  color: white;
  text-decoration: none;
}

.groups img {
  width: 32px;
  height: 32px;
}

.contacts a:hover, .groups a:hover {
  text-decoration: underline;
}
</style>