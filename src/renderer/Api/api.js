/**
 * 存放 Api 接口文件
 * @userRegister 注册接口
 *      registerInfo 注册表单数据
 * @userLogin 登录接口
 *      loginInfo 登录表单数据
 * @getUserInfo
 *      通过token匹配用户信息
 * @updateUserInfo
 *      userInfo 修改用户数据
 */
import Axios from './http.js'

export function userRegister(registerInfo) {
    return Axios({
        url: '/hdgc/users/register',
        data: registerInfo,
        method: 'post',
    })
}
export function userLogin(loginInfo) {
    return Axios({
        url: '/hdgc/users/login',
        data: loginInfo,
        method: 'post',
    })
}
export function getUserInfo() {
    return Axios({
        url: '/hdgc/users/',
        method: 'get'
    })
}
export function updateUserInfo(userInfo) {
    return Axios({
        url: '/hdgc/users/',
        data: userInfo,
        method: 'post',
    })
}