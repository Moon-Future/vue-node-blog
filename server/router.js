const Router = require('koa-router')
const article = require('./api/article')
const user = require('./api/user')
const router = new Router({
  prefix: '/api'
})

router.use('/article', article.routes())
router.use('/user', user.routes())

module.exports = router