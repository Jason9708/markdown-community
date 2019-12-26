/**
 * 同步实现状态更新
 * @param {*} state 状态列表对象
 * @param {*} data  新状态值
 */

export const setIsAuthenticated = (state, data) => {
    state.isAuthenticated = data;
};
export const setUser = (state, data) => {
    state.user = data;
};
export const setLoading = (state, data) => {
    state.loading = data;
};