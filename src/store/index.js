import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authModule from "@/store/auth/index.js"

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: authModule
    }
})