"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store'
import router from '../router'
import { LoadingPlugin  } from 'vux'
import VueRouter from '_vue-router@3.0.6@vue-router';
Vue.use(LoadingPlugin);
// console.log(Vue.$vux)
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if(config.params){
      config.params.token = store.state.token || localStorage.token;
      // config.params.token = 'dd93620392680ec8ad2c249c4976fe98'
    }
    console.log(config.hideLoading)
    if(!config.hideLoading){
      Vue.$vux.loading.show({
        text: '加载中'
      })
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
    
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    Vue.$vux.loading.hide();
    // Do something with response data
    console.log(111,response)
    if(response.data.code == "40004"){
      router.push({
        path:"/login"
      })
    }
    return response;
  },
  function(error) {
    Vue.$vux.loading.hide();
    // Do something with response error
    return Promise.reject(error);
  }
);
// 请求数据改成form data
_axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}];
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
