/**
 * action 提交 mutations 实现异步更新状态
 * @param {*} {commit} 解构赋值，提取context中的commit 
 * @param {*} data 更新值
 * commit('funName',data) 这里的"funName"必须与mutations中一致
 */

export const setIsAuthenticated = ({ commit }, data) => {
    commit("setIsAuthenticated", data);
};

export const setUser = ({ commit }, data) => {
    commit("setUser", data);
};

export const setLoading = ({ commit }, data) => {
    commit("setLoading", data);
};

export const clearCurrentState = ({ commit }, data) => {
    commit('setIsAuthenticated', false)
    commit('setUser', {})
    commit("setLoading", false);
}