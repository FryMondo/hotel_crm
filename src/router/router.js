import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import FAQ from "@/pages/FAQ.vue";
import ReservationPage from "@/pages/ReservationPage.vue";
import RoomsPage from "@/pages/RoomsPage.vue";
const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/registration',
        component: RegistrationPage
    },
    {
        path: '/FAQ',
        component: FAQ
    },
    {
        path: '/reservation',
        component: ReservationPage
    },
    {
        path: '/rooms',
        component: RoomsPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;