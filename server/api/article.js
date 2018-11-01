const Router = require('koa-router')
const marked = require('marked')
const router = new Router()
const Article = require('../database/schema/article')
const ObjectId = require('mongoose').Types.ObjectId
const checkRoot = require('./root')

router.post('/insertArticle', async (ctx) => {
  try {
    const checkResult = checkRoot(ctx)
    if (checkResult.code === 500) {
      ctx.body = checkResult
      return
    }
    const data = ctx.request.body.data
    const currentTime = new Date().getTime()
    const html = marked(data.content)
    const article = new Article({
      title: data.title,
      content: data.content,
      html,
      user: Object(data.user),
      createdTime: currentTime,
    })
    await article.save()
    ctx.body = {code: 200, message: '发布成功'}
  } catch(err) {
    throw new Error(err)
  }
})

router.get('/insertArticleByJson', async (ctx) => {
  ctx.body = '开始导入 Article 数据'
  let saveCount = 0
  articleData.forEach(ele => {
    let article = new Article(ele)
    article.save().then(() => {
      saveCount++
      console.log('插入成功 ' + saveCount)
    }).catch(err => {
      console.log('插入失败' + err)
    })
  })
})

router.post('/getArticleList', async (ctx) => {

})

router.post('/getArticleInfo', async (ctx) => {

})

module.exports = router