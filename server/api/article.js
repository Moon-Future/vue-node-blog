const Router = require('koa-router')
const marked = require('marked')
const router = new Router()
const Article = require('../database/schema/article')
const Tag = require('../database/schema/tag')
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
    const tags = data.tags
    const html = marked(data.content)
    let tagsId = []
    if (tags.length !== 0) {
      let insertTags = [], tagResult = []
      tags.forEach(ele => {
        if (ele.id.indexOf('newTag') !== -1) {
          insertTags.push({name: ele.name, createdTime: currentTime})
        } else {
          tagsId.push(ObjectId(ele.id))
        }
      })
      tagResult = await Tag.insertMany(insertTags)
      tagResult.forEach(ele => {
        tagsId.push(ObjectId(ele._id))
      })
    }
    const article = new Article({
      title: data.title,
      content: data.content,
      html,
      user: ObjectId(data.user),
      tag: tagsId,
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