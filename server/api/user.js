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
      website: data.website,
      createTime: new Date().getTime()
    })
    user.save()
    ctx.body = {code: 200, message: '注册成功'}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/login', async (ctx) => {
  try {
    const data = ctx.request.body.data
    const email = data.email
    const password = data.password
    const result = await User.find({email: email})
    if (result.length === 0) {
      ctx.body = {code: 500, message: '用户不存在'}
    } else if(result[0].password !== password) {
      ctx.body = {code: 500, message: '密码错误'}
    } else {
      ctx.session.userInfo = {id: result[0]._id, name: result[0].name, root: result[0].root}
      ctx.body = {code: 200, message: '登陆成功'}
    }
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/logout', async (ctx) => {
  try {
    ctx.session = null
    ctx.body = {code: 200, message: '已退出'}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/getSession', async (ctx) => {
  try {
    const userInfo = ctx.session.userInfo
    if (userInfo) {
      ctx.body = {code: 200, message: userInfo}
    } else {
      ctx.body = {code: 500, message: '请先登陆'}
    }
  } catch(err) {
    throw new Error(err)
  }
})

module.exports = router