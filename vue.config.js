module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
     },
  }
}