export default {
    data() {
        return {
            imagesHotel: ["./pictures/hotel_info/main_hotel1.jpeg", "./pictures/hotel_info/main_hotel2.jpeg",
                "./pictures/hotel_info/main_hotel3.jpeg"],
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
        this.startImageRotation();
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
        scrollToWelcome() {
            const welcomeSection = document.getElementById('welcome');
            welcomeSection.scrollIntoView({ behavior: 'smooth' });
        },
        scrollToInformation() {
            const informationSection = document.getElementById('information');
            informationSection.scrollIntoView({ behavior: 'smooth' });
        },
        scrollToRoomInformation() {
            const informationSection = document.getElementById('room-information');
            informationSection.scrollIntoView({ behavior: 'smooth' });
        },
        scrollToLocation() {
            const locationSection = document.getElementById('location');
            locationSection.scrollIntoView({ behavior: 'smooth' });
        },
        showUsername(){
            return localStorage.getItem('username');
        },
        startImageRotation() {
            this.intervalId = setInterval(this.rotateImage, 5000);
        },
        stopImageRotation() {
            clearInterval(this.intervalId);
        },
        rotateImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.imagesHotel.length;
        }
    },
};
