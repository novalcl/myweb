import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Index from './views/Home/Index.vue'
// import App from './App.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      meta:{
        title:'首页'
      },
      name: 'Index',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Index.vue')
    },
    {
      path: '/news',
      meta:{
        title:'资讯'
      },
      name: 'News',
      component: () => import(/* webpackChunkName: "about" */ './views/News/News.vue')
    },
    {
      path: '/newsdetail',
      meta:{
        title:'资讯详情'
      },
      name: 'NewsDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/News/NewsDetail.vue')
    },
    {
      path: '/category',
      meta:{
        title:'分类'
      },
      name: 'Category',
      component: () => import(/* webpackChunkName: "about" */ './views/Category/Category.vue')
    },
    {
      path: '/company',
      meta:{
        title:'企业'
      },
      name: 'Company',
      component: () => import(/* webpackChunkName: "about" */ './views/Company/Company.vue')
    },
    {
      path: '/companydetail',
      meta:{
        title:'企业'
      },
      name: 'CompanyDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/Company/CompanyDetail.vue')
    },
    {
      path: '/register',
      meta:{
        title:'企业'
      },
      name: 'Company',
      component: () => import(/* webpackChunkName: "about" */ './views/Register/Register.vue')
    },
    {
      path: '/mine',
      meta:{
        title:'我的'
      },
      name: 'Mine',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/index.vue')
    },
    {
      path: '/minemessage',
      meta:{
        title:'我的消息'
      },
      name: 'MineMessage',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/MineMessage.vue')
    },
    {
      path: '/stationmessage',
      meta:{
        title:'站内信'
      },
      name: 'StationMessage',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/StationMessage.vue')
    },
    {
      path: '/mineshop',
      meta:{
        title:'下载二维码'
      },
      name: 'MineShop',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/MineShop.vue')
    },
    {
      path: '/collectmessage',
      meta:{
        title:'商品收藏'
      },
      name: 'CollectMessage',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/CollectMessage.vue')
    },
    {
      path: '/collectmerchant',
      meta:{
        title:'商家收藏'
      },
      name: 'CollectMerchant',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/CollectMerchant.vue')
    },
    {
      path: '/collectnews',
      meta:{
        title:'资讯收藏'
      },
      name: 'CollectNews',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/CollectNews.vue')
    },
    {
      path: '/aboutapp',
      meta:{
        title:'关于App'
      },
      name: 'AboutApp',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/AboutApp.vue')
    },
    {
      path: '/aboutwe',
      meta:{
        title:'关于我们'
      },
      name: 'AboutWe',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/AboutWe.vue')
    },
    {
      path: '/feedback',
      meta:{
        title:'意见反馈'
      },
      name: 'FeedBack',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/FeedBack.vue')
    },
    {
      path: '/login',
      meta:{
        title:'登录'
      },
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login/login.vue')
    },{
      path: '/edituser',
      meta:{
        title:'编辑个人信息'
      },
      name: 'EditUser',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine/editUser.vue')
    },
    {
      path: '/service',
      meta:{
        title:'服务协议'
      },
      name: 'Service',
      component: () => import(/* webpackChunkName: "about" */ './views/Register/service.vue')
    },
    {
      path: '/product',
      meta:{
        title:'商品详情'
      },
      name: 'Service',
      component: () => import(/* webpackChunkName: "about" */ './views/Product/index.vue')
    },
    {
      path: '/recomd',
      meta:{
        title:'商品评价'
      },
      name: 'ProductRecomd',
      component: () => import(/* webpackChunkName: "about" */ './views/Product/ProductRecomd.vue')
    },
    {
      path: '/productlist',
      meta:{
        title:'商品列表'
      },
      name: 'ProductList',
      component: () => import(/* webpackChunkName: "about" */ './views/Product/list.vue')
    },
    // {
    //   path: '/listtest',
    //   meta:{
    //     title:'商品列表'
    //   },
    //   name: 'ProductList',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Product/listtest.vue')
    // },
    
  ]
})
