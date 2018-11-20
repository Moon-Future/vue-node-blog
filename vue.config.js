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
  }
}