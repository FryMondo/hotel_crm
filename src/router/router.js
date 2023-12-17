import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import FAQ from "@/pages/FAQ.vue";
import ReservationPage from "@/pages/ReservationPage.vue";
import RoomsPage from "@/pages/RoomsPage.vue";
import AdditionalInfo from "@/pages/AdditionalInfo.vue";
import ReservedRooms from "@/pages/ReservedRooms.vue";
import AllUsers from "@/pages/AllUsers.vue";

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
    },
    {
        path: '/additional',
        component: AdditionalInfo
    },
    {
        path: '/reserved',
        component: ReservedRooms
    },
    {
        path: '/allUsers',
        component: AllUsers
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;