import axios from 'axios'
import store from '../store'

// 请求拦截
axios.interceptors.request.use(config => {
    store.dispatch('setLoading', true)
    if (localStorage.jwtToken) {
        // 当缓存中存在Token时，将Token设置为请求头的 Authorization
        config.headers.Authorization = localStorage.jwtToken
    }
    return config
}, error => {
    return Promise.reject(error)
})


// 响应拦截
axios.interceptors.response.use(response => {
    store.dispatch('setLoading', false)
    console.log('响应拦截:', response)
    return response
}, error => {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
})

export default axios