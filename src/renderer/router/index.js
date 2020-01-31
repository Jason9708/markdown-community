import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import jwt_decode from 'jwt-decode'
import { Message } from 'element-ui'
Vue.use(Router)

const route = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            meta: {
                title: '主页'
            },
            component: require('@/pages/Home/index.vue').default
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/main',
            name: 'Main',
            component: require('@/pages/Main/index.vue').default,
            children: [{
                    path: '/create',
                    name: 'create',
                    meta: {
                        title: '新建'
                    },
                    component: require('@/pages/Main/Article/create.vue').default,
                },
                {
                    path: '/detail',
                    name: 'detail',
                    meta: {
                        title: '详情'
                    },
                    component: require('@/pages/Main/Article/detail.vue').default,
                },
                {
                    path: '/society',
                    name: 'society',
                    meta: {
                        title: '社区'
                    },
                    component: require('@/pages/Main/Society/index.vue').default,
                },
                {
                    path: '/document',
                    name: 'document',
                    meta: {
                        title: '个人文章'
                    },
                    component: require('@/pages/Main/Document/index.vue').default,
                },
                {
                    path: '/profile',
                    name: 'profile',
                    meta: {
                        title: '修改个人信息'
                    },
                    component: require('@/pages/Main/Profile/index.vue').default,
                }
            ]
        }
    ]
})

route.beforeEach((to, from, next) => {
    // 若返回首页以及社区，无须鉴权
    if (to.path == '/' || to.path == '/society') {
        next()
    } else {
        /**
         * 判断当前是否存在Token
         * @存在则进行鉴权判断
         * @不存在则返回首页
         */
        if (localStorage.Token) {
            /**
             * 判断当前Token是否过期
             * @过期则跳回首页
             * @未过期则成功跳转
             */
            const decoded = jwt_decode(localStorage.Token)
            const currentTime = Date.now() / 1000
            console.log('Token_Decode & currentTime', decoded, currentTime)
            if (decoded.exp < currentTime) {
                Vue.prototype.$notify({
                    title: 'Tips',
                    message: 'Token过期，重新登录',
                    type: 'error',
                    duration: 3000
                })
                store.dispatch('clearCurrentState')
                next('/')
            } else {
                next()
            }
        } else {
            Vue.prototype.$notify({
                title: 'Tips',
                message: '请先登录！',
                type: 'error',
                duration: 3000
            })
            store.dispatch('clearCurrentState')
            next('/')
        }
    }
})

export default route;