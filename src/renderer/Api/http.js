import axios from 'axios'
import store from '../store'

/**
 * Axios 基本配置封装
 * @baseURL 基础路径（前缀）
 * @timeout 超时时间
 * @responseType 响应数据类型 (json)
 * @withCredentials 是否允许带cookie等
 * @header 根据不同请求设置
 */
const Axios = axios.create({
    baseURL: '/',
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    proxy: {
        host: 'localhost',
        port: 5000,
    }
})

// 请求拦截
Axios.interceptors.request.use(config => {
    store.dispatch('setLoading', true)
    if (localStorage.Token) {
        // 当缓存中存在Token时，将Token设置为请求头的 Authorization
        config.headers.Authorization = localStorage.Token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
Axios.interceptors.response.use(response => {
    store.dispatch('setLoading', false)
    console.log('响应拦截:', response)
    return response
}, error => {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
})


export default Axios