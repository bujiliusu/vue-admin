import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    
    // user : ''
    user:"JSON.parse(localStorage.getItem('user')) || ''"
}

// 定义所需的 mutations
const mutations = {
    LOGIN(state) {
        state.user=JSON.parse(localStorage.getItem('user'))
    },
    LOGOUT(state) {
        state.user = ''
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}

const actions = {
    login ({commit}) {
        commit('LOGIN')
    },
    logout ({commit}) {
        commit('LOGOUT')
    }

}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations,
    actions
})