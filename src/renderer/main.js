import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './element-ui'
// 引入 mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入全局变量模块
import global from './utils/common'

Vue.use(mavonEditor)

// 挂载全局变量
Vue.prototype.global = global

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')