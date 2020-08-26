import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '@/views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]

const router = new VueRouter({
    routes
})

export default router