function getStorage() {
    // fallback if the browser does not support localStorage
    return localStorage ? localStorage : sessionStorage
}

function getLocalAuthToken() {
    return getStorage().getItem("authToken")
}

function setLocalAuthToken(token) {
    getStorage().setItem("authToken", token)
}

function removeLocalAuthToken() {
    getStorage().removeItem("authToken")
}

const initialState = {
    authToken: getLocalAuthToken()
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
                setLocalAuthToken(true)
            } catch (error) {
                removeLocalAuthToken()
            }
        },
        logout({ commit }) {
            commit("AUTH_LOGOUT")
            removeLocalAuthToken()
        },
    },
    getters: {
        isAuthenticated: state => !!state.authToken
    }
}

export default store