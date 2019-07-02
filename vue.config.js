const vuxLoader = require('vux-loader')

module.exports = {
  devServer: {
    open: true, //浏览器自动打开页面
    host: "localhost", //如果是真机测试，就使用这个IP
    port: 8911,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      //配置跨域
      '/api': {
        target: "https://dqpj.m.huisou.com/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    vuxLoader.merge(config, {
      // plugins: ['vux-ui', 'duplicate-style']
      plugins: [{
          name: 'vux-ui'
        },
        {
          name: 'duplicate-style'
        },
        {
          name: 'less-theme',
          path: 'src/assets/css/theme.less'
        },
      ]
    })
  }
}