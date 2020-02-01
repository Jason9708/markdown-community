// 😀 存放 Api 接口文件

/**
 * about User
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


/**
 * about Article
 * @writeArticle 写文章接口
 *      articleInfo 文章表单数据
 * @getArticleList 获取全部文章列表接口
 * @getArticleListById 获取某人文章列表接口
 *       通过创建人id
 * @getArticleDetail 获取文章详情接口
 *      通过文章id
 * @deletArticle
 *      通过文章id
 * @updateArticle
 *      修改文章
 */
export function writeArticle(articleInfo) {
    return Axios({
        url: '/hdgc/article',
        data: articleInfo,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

export function editorUpload(formdata) {
    return Axios({
        url: '/hdgc/article/markdownPic',
        data: formdata,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

export function getArticleListById(id) {
    return Axios({
        url: `/hdgc/article/${id}`,
        method: 'get'
    })
}

export function getArticleDetail(id) {
    return Axios({
        url: `/hdgc/article/articleInfo/${id}`,
        method: 'get'
    })
}

export function deletArticleById(id) {
    return Axios({
        url: `/hdgc/article/${id}`,
        method: 'delete'
    })
}