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
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/dashboard/:symbol',
        name: "dashboard-stock-details",
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '@/views/DashboardSymbol.vue')
    }
]


const router = new VueRouter({
    routes
})

export default router