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

// 全局过滤器
Vue.filter('timeFormat', function(date) {
    var time = new Date(date)
    console.log(time)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    console.log(year, month, day)
    return `${year}-${month}-${day}`
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')