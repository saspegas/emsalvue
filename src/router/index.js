import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: () => import('../components/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router