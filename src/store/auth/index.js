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
        login({ commit, dispatch }) {
            try {
                commit("AUTH_LOGIN")
                setLocalAuthToken(true)
                dispatch("user/startUserData", null, { root: true })
                    // dispatch("user/startUserData", null, { root: true })
            } catch (error) {
                removeLocalAuthToken()
            }
        },
        logout({ commit, dispatch }) {
            try {
                commit("AUTH_LOGOUT")
                dispatch("user/clearUserData", null, { root: true })
                    // dispatch("user/clearUserData", null, { root: true })
            } catch (error) {
                removeLocalAuthToken()
            }
        }
    },
    getters: {
        isAuthenticated: state => !!state.authToken
    }
}

export default store