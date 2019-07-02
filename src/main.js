import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/base.less'
import { apiUrl } from '@/assets/js/env'
import * as tool from '@/assets/js/util'
import  { AlertPlugin, LoadingPlugin, ToastPlugin,ConfirmPlugin   } from 'vux'
Vue.prototype.$tool = tool;
// 全局引入toast提示框
Vue.use(ToastPlugin)
// 全局引入弹窗
Vue.use(AlertPlugin)
// 全局引入loading
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false
// 接口前缀
Vue.prototype.$apiUrl = apiUrl
router.beforeEach((to, from, next) => {
  console.log(to)
  if(to.path == "/mine"){
    if(!localStorage.token){
      router.push({
        path:"/login"
      })
    }
  }
  document.title = to.meta.title
  next();
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
