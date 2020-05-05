import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/global.css'
import axios from 'axios'
//配置基础路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
//使用请求拦截器，添加请求头，若请求必须先经过它
axios.interceptors.request.use(config => {
  //在headers中添加后台要求的Authorization头，保存token值
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //必须最后将config人return回去
  return config;
});

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
