import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'


import { Icon, Button, Input, Form, FormItem, Carousel, CarouselItem, Loading, Upload, Notification, Dialog } from 'element-ui'

Vue.use(Icon).use(Button).use(Input).use(Form).use(FormItem).use(Carousel).use(CarouselItem).use(Loading).use(Upload).use(Dialog)

Vue.prototype.$notify = Notification