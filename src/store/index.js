import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authModule from "@/store/auth/index.js"
import userModule from "@/store/user/index.js"

export default new Vuex.Store({
    state: {
        globalMessages: []
    },
    mutations: {
        POP_GLOBAL_MESSAGE(state, message) {
            console.log(state);
            const filtered = [...state.globalMessages].filter(v => v !== message)
            state.globalMessages = [...filtered]
        },
        PUSH_GLOBAL_MESSAGE(state, message) {
            console.log(state);
            state.globalMessages = [...state.globalMessages, message]
        }
    },
    actions: {
        // pushGlobalMessage({ commit }, { type = "info", milliseconds = 6000, text = "" } = message) {
        pushGlobalMessage({ commit }, message) {
            if (!message.text) return;

            commit("PUSH_GLOBAL_MESSAGE", message)

            const timeout = setTimeout(() => {
                commit("POP_GLOBAL_MESSAGE", message)
                clearTimeout(timeout)
            }, message.milliseconds);

        },
        pushGlobalSuccessMessage({ dispatch }, text) {
            dispatch("pushGlobalMessage", { type: "success", text, milliseconds: 6000 })
        },
        pushGlobalErrorMessage({ dispatch }, text) {
            dispatch("pushGlobalMessage", { type: "error", text, milliseconds: 6000 })
        },
    },
    modules: {
        auth: authModule,
        user: userModule
    }
})