const Router = require('koa-router')
const router = new Router()
const User = require('../database/schema/user')

router.post('/register', async (ctx) => {
  try {
    const data = ctx.request.body.data
    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      createTime: new Date().getTime()
    })
    user.save()
    ctx.body = {code: 200, message: '注册成功'}
  } catch(err) {
    throw new Error(err)
  }
})

router.get('/getUserList', async (ctx) => {

})

router.post('/getUserInfo', async (ctx) => {

})

module.exports = router