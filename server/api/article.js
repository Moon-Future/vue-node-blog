const Router = require('koa-router')
const router = new Router()
const Article = require('../database/schema/article')
const ObjectId = require('mongoose').Types.ObjectId

const articleData = [
  {
    title: 'vue+node+mysql搭建个人博客（2）',
    summary: '',
    content: '',
    comment: [],
    user: ObjectId('5aeac9a955fa7427474594d5'),
    tag: [ObjectId('5aeac9a955fa7427474594d5'), ObjectId('5aeac9a955fa7427474594d6')],
    createdTime: new Date().getTime(),
  }
]

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

router.get('/getArticleList', async (ctx) => {

})

router.post('/getArticleInfo', async (ctx) => {

})

module.exports = router