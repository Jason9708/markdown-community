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
                path: '/',
                name: 'create',
                meta: {
                    title: '新建'
                },
                component: require('@/pages/Main/Article/create.vue').default,
            }]
        }
    ]
})