const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const marked = require('marked')
const router = new Router()
const Article = require('../database/schema/article')
const Tag = require('../database/schema/tag')
const ObjectId = require('mongoose').Types.ObjectId
const checkRoot = require('./root')
const filePath = path.join(__dirname, '../articles')

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

router.post('/insertArticle', async (ctx) => {
  try {
    const checkResult = checkRoot(ctx)
    if (checkResult.code === 500) {
      ctx.body = checkResult
      return
    }
    const data = ctx.request.body.data
    const currentTime = new Date().getTime()
    const tags = data.tags || []
    const html = marked(data.content)
    let tagsId = []
    if (tags.length !== 0) {
      let insertTags = [], tagResult = []
      tags.forEach(ele => {
        if (ele.id.indexOf('newTag') !== -1) {
          insertTags.push({name: ele.name, createTime: currentTime})
        } else {
          tagsId.push(ObjectId(ele.id))
        }
      })
      tagResult = await Tag.insertMany(insertTags)
      tagResult.forEach(ele => {
        tagsId.push(ObjectId(ele._id))
      })
    }
    let htmlTags = html.match(/.*|<(.|\n)*?<\/.*>.*/g)
    let summary = ''
    let count = 0
    let limit = 0
    for(let i = 0, len = htmlTags.length; i < len; i++) {
      if (htmlTags[i] === '') {
        summary += '\n'
      }
      if (htmlTags[i].match(/^<(.)/)) {
        let tag = htmlTags[i].match(/^<(.)/)[1]
        if (tag === 'h') {
          count += 1
        }
        if (count > limit && tag === 'h') {
          break
        }
      }
      summary += htmlTags[i]
    }
    summary = summary.replace(/\'/g, '"')
    const article = new Article({
      title: data.title,
      summary,
      content: '',
      html: '',
      user: ObjectId(data.user),
      tag: tagsId,
      createTime: currentTime,
    })
    const result = await article.save()
    const fileName = result._id + '_' + data.title
    fs.writeFileSync(path.join(filePath, fileName + '.md'), data.content, 'utf-8')
    fs.writeFileSync(path.join(filePath, fileName + '.html'), html, 'utf-8')
    ctx.body = {code: 200, message: '发布成功'}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/getArticle', async (ctx) => {
  try {
    const data = ctx.request.body.data
    let result
    if (data.admin) {
      const checkResult = checkRoot(ctx)
      if (checkResult.code === 500) {
        ctx.body = checkResult
        return
      }
      // 后台管理列表
      result = await Article.find({}, {summary: 0, content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.summary) {
      // home首页列表
      result = await Article.find({}, {content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.hot) {
      // 热门列表
      result = await Article.find({}, {content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.catalog) {
      // 归档目录
      result = await Article.find({}, {summary: 0, content: 0, html: 0, comment: 0}).sort({createTime:-1}).populate('tag')
    } else {
      // 文章内容
      result = await Article.find({_id: data.id}, {content: 0, summary: 0, comment: 0}).populate('tag')
      if (result.length !== 0 && data.chapter === undefined) {
        await Article.update({_id: data.id}, {view: result[0].view + 1})
      }
      if (result.length !== 0) {
        const title = result[0].title
        const html = fs.readFileSync(path.join(filePath, `${data.id}_${title}.html`), 'utf-8')
        result[0].html = html
      }
    }
    ctx.body = {code: 200, message: result}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/getArticleInfo', async (ctx) => {

})

module.exports = router