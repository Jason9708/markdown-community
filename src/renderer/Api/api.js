/**
 * 存放 Api 接口文件
 * @userRegister 注册接口
 *      registerInfo 注册表单数据
 * @userLogin 登录接口
 *      loginInfo 登录表单数据
 */
import Axios from './http.js'

export function userRegister(registerInfo) {
    return Axios({
        url: '/hdgc/users/register',
        data: registerInfo,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function userLogin(loginInfo) {
    return Axios({
        url: '/hdgc/users/login',
        data: loginInfo,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function getUserInfo(username) {
    return Axios({
        url: '/hdgc/users/',
        data: username,
        method: 'get'
    })
}