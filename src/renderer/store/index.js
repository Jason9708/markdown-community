import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

/**
 * 状态列表
 * @isAuthenticated 是否认证成功
 * @user 当前用户信息
 * @loading 是否显示加载动画
 */
const state = {
    isAuthenticated: false,
    user: {},
    loading: false
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})