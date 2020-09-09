import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

axios.interceptors.request.use(
  (config) => {
  if ( localStorage.token ){
      
    config.headers.common['token']= localStorage.token;
  }
  
  // 在发送请求之前做些什么
  return config
  }, (error) => {
   Message({
     showClose:true,
     message: error && error.data.error.message,
     type:'error' 
   })
  // 对请求错误做些什么
  return Promise.reject(error.data.error.message)
})





//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

