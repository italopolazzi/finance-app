import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authModule from "@/store/auth/index.js"
import userModule from "@/store/user/index.js"

export default new Vuex.Store({
    state: {
        globalMessages: []
    },
    mutations: {},
    actions: {},
    modules: {
        auth: authModule,
        user: userModule
    }
})