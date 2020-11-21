import Vue from 'vue'
import router from './router'

import store from './store'
import './assets/css/global.css'
// import './plugins/element.js'
import ElementUI from 'element-ui';
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
import VueParticles from 'vue-particles'


axios.defaults.baseURL = 'http://192.168.1.142:8888/api/private/v1/'
axios.interceptors.request.use(config =>{
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
