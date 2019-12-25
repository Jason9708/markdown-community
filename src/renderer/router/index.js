import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
                    path: '/society',
                    name: 'society',
                    meta: {
                        title: '社区'
                    },
                    component: require('@/pages/Main/Society/index.vue').default,
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