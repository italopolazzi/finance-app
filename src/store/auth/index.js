const initialState = {}

if (localStorage) {
    initialState.authToken = "true" === localStorage.getItem("authToken")
}

const store = {
    namespaced: true,
    state: {
        ...initialState
    },
    mutations: {
        AUTH_LOGIN(state) {
            state.authToken = true
        },
        AUTH_LOGOUT(state) {
            state.authToken = false
        }
    },
    actions: {
        login({ commit }) {
            try {
                commit("AUTH_LOGIN")
                if (localStorage) {
                    localStorage.setItem("authToken", true)
                }
            } catch (error) {
                if (localStorage) {
                    localStorage.removeItem("authToken")
                }
            }
        },
        logout({ commit }) {
            commit("AUTH_LOGOUT")
            if (localStorage) {
                localStorage.removeItem("authToken")
            }
        },
    },
    getters: {
        isAuthenticated: state => state.authToken
    }
}

export default store