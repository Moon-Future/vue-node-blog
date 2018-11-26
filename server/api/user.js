const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable');
const router = new Router()
const User = require('../database/schema/user')
const cosUpload = require('./tencentCloud.js')
const avatarDafault = 'cl8023-1255423800.cos.ap-guangzhou.myqcloud.com/avatar/default.jpg'
const {transporter, mailOptions, sendMsg} = require('./email')
const {dateFormat} = require('./tool')

router.post('/register', async (ctx) => {
  try {
    const data = ctx.request.body.data
    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: avatarDafault,
      website: data.website,
      createTime: new Date().getTime()
    })
    user.save()
    ctx.body = {code: 200, message: '注册成功'}
    mailOptions.html = '<h1>' + sendMsg.newUser + '<h1>'
      + '<p>' + sendMsg.email + ': ' + data.email + '</p>'
      + '<p>' + sendMsg.name + ': ' + data.name + '</p>'
      + '<p>' + sendMsg.website + ': ' + data.website + '</p>'
      + '<p>' + sendMsg.time + ': ' + dateFormat(new Date, 'yyyy-MM-dd hh:mm:ss') + '</p>';
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  } catch(err) {
    throw new Error(err)
  }
})

router.get('/registerByJson', async (ctx) => {
  try {
    const fileContent = fs.readFileSync(__dirname, '../jsonData/user.js', 'utf-8')
    for (let i = 0, len = fileContent.length; i < len; i++) {
      const data = fileContent[i]
      const user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: avatarDafault,
        website: data.website,
        createTime: new Date().getTime()
      })
      user.save()
    }
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
      ctx.session.userInfo = {id: result[0]._id, name: result[0].name, avatar: result[0].avatar, root: result[0].root}
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

router.post('/upload', async (ctx) => {
  try {
    const userInfo = ctx.session.userInfo
    const {fields, files} = await formParse(ctx.req)
    const avatarData = files.avatar
    const filePath = avatarData.path
    const fileName = '/avatar/' + userInfo.id + '.jpg'
    const result = await cosUpload(fileName, filePath)
    ctx.session.userInfo.avatar = result.Location
    await User.update({_id: userInfo.id}, {avatar: result.Location})
    ctx.body = {code: 200, message: {avatar: result.Location}}
  } catch(err) {
    throw new Error(err)
  }
})

function formParse(req) {
  let form = new formidable.IncomingForm()
  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)
      } else {
        resolve({fields, files})
      }
    })
  })
}

module.exports = router