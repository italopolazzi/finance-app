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
        PUSH_WATCHLIST(state, companyCode) {
            state.watchList = [...state.watchList, companyCode]
        },
        POP_WATCHLIST(state, companyCode) {
            const filtered = [...state.watchList].filter(v => v !== companyCode)
            state.watchList = [...filtered]
        }
    },
    // actions
    actions: {
        async addCompanyToWatchList({ dispatch, commit, getters, rootGetters }, companyCode) {
            try {
                const isAuthenticated = rootGetters["auth/isAuthenticated"]
                if (!isAuthenticated) throw Error("User not authenticated!")
                if (getters.isCompanyWatched(companyCode)) throw Error("Company already listed in watch list!")

                const message = await simulateResolveRequest({
                    text: "Company added to watch list"
                })

                commit("PUSH_WATCHLIST", companyCode)

                dispatch("pushGlobalSuccessMessage", message.text, { root: true })
            } catch (error) {
                dispatch("pushGlobalErrorMessage", error.message, { root: true })
            }
        },
        async removeCompanyFromWatchList({ dispatch, commit, getters, rootGetters }, companyCode) {
            try {
                const isAuthenticated = rootGetters["auth/isAuthenticated"]
                if (!isAuthenticated) throw Error("User not authenticated!")
                if (!getters.isCompanyWatched(companyCode)) throw Error("Company not listed in watch list!")


                const message = await simulateResolveRequest({
                    text: "Company removed from watch list"
                })
                commit("POP_WATCHLIST", companyCode)

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
        isCompanyWatched: state => companyCode => {
            return state.watchList.includes(companyCode)
        }
    }
}

export default store

/*eslint-enable*/