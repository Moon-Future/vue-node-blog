const Router = require('koa-router')
const article = require('./api/article')
const tag = require('./api/tag')
const user = require('./api/user')
const router = new Router({
  prefix: '/api'
})

router.use('/article', article.routes())
router.use('/tag', tag.routes())
router.use('/user', user.routes())

module.exports = router