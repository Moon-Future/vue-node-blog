const Router = require('koa-router')
const article = require('./api/article')
const router = new Router({
  prefix: '/api'
})

router.use('/article', article.routes())

module.exports = router