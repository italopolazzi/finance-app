/*eslint-disable*/
import {
    simulateResolveRequest
} from "@/utils/simulateRequests.js"

const initialState = {
    watchList: [
        "PETR4",
        "VIVT4",
        "BBAS3",
        "CMIG4",
        "BBDC4",
        "OIBR4",
        "VALE5",
    ]
}

const store = {
    namespaced: true,
    // state
    state: {
        ...initialState
    },
    // mutations
    mutations: {
        SET_USER(state) {
            Object.keys(state).forEach(key => {
                state[key] = initialState[key]
            })
        },
        UNSET_USER(state) {
            Object.keys(state).forEach(key => {
                state[key] = null
            })
        },
        PUSH_WATCHLIST(state, company) {
            state.watchList = [...state.watchList, company]
        },
        POP_WATCHLIST(state, company) {
            const filtered = [...state.watchList].filter(v => v !== company)
            state.watchList = [...filtered]
        }
    },
    // actions
    actions: {
        async addCompanyToWatchList({ dispatch, commit, getters, rootGetters }, company) {
            try {
                const isAuthenticated = rootGetters["auth/isAuthenticated"]
                if (!isAuthenticated) throw Error("User not authenticated!")
                if (getters.isCompanyWatched(company)) throw Error("Company already listed in watch list!")

                const message = await simulateResolveRequest({
                    text: "Company added to watch list"
                })

                commit("PUSH_WATCHLIST", company)

                dispatch("pushGlobalSuccessMessage", message.text, { root: true })
            } catch (error) {
                dispatch("pushGlobalErrorMessage", error.message, { root: true })
            }
        },
        async removeCompanyFromWatchList({ dispatch, commit, getters, rootGetters }, company) {
            try {
                const isAuthenticated = rootGetters["auth/isAuthenticated"]
                if (!isAuthenticated) throw Error("User not authenticated!")
                if (!getters.isCompanyWatched(company)) throw Error("Company not listed in watch list!")


                const message = await simulateResolveRequest({
                    text: "Company removed from watch list"
                })
                commit("POP_WATCHLIST", company)

                dispatch("pushGlobalSuccessMessage", message.text, { root: true })
            } catch (error) {
                dispatch("pushGlobalErrorMessage", error.message, { root: true })
            }
        },
        startUserData({ commit }) {
            commit("SET_USER")
        },
        clearUserData({ commit }) {
            commit("UNSET_USER")
        }
    },
    // getters
    getters: {
        isCompanyWatched: state => company => {
            return state.watchList.includes(company)
        }
    }
}

export default store

/*eslint-enable*/