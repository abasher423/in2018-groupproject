import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    mutation: {
        setToken (state, token){
            state.token = token
        }
    },
    actions: {
        setToken ({commit}, token){
            commit('setToken', token)
        }
    }
})