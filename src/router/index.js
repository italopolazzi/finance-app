import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

import Store from "@/store"

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
        name: "dashboard-symbol",
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '@/views/DashboardSymbol.vue')
    },
    {
        path: '/logout',
        name: "auth-logout"
    }
]




const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    if (to.name === "auth-logout") {
        Store.dispatch("auth/logout")
        next("/")
    }

    next()
})

export default router