const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const marked = require('marked')
const router = new Router()
const Article = require('../database/schema/article')
const Tag = require('../database/schema/tag')
const ObjectId = require('mongoose').Types.ObjectId
const checkRoot = require('./root')
const filePath = path.join(__dirname, '../file/articles')

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
    const root = ctx.session.userInfo.root
    const data = ctx.request.body.data
    const currentTime = new Date().getTime()
    const tags = data.tags || []
    const html = marked(data.content)
    let tagsId = [], result = [], fileName = '', message = ''
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
    if (data.id === '-1') {
      // 新增
      const article = new Article({
        title: data.title,
        summary,
        content: '',
        html: '',
        user: ObjectId(data.user),
        tag: tagsId,
        createTime: currentTime,
        state: root === 0 ? 2 : data.state
      })
      result = await article.save()
      fileName = result._id + '_' + data.title
      message = '发布成功'
    } else {
      // 更新
      await Article.update({_id: data.id}, {
        title: data.title,
        summary,
        tag: tagsId,
        updateTime: currentTime,
        state: root === 0 ? 2 : data.state
      })
      fileName = data.id + '_' + data.title
      message = '更新成功'
      if (data.title !== data.originTitle) {
        fs.renameSync(path.join(filePath, data.id + '_' + data.originTitle + '.md'), path.join(filePath, fileName + '.md'));
        fs.renameSync(path.join(filePath, data.id + '_' + data.originTitle + '.html'), path.join(filePath, fileName + '.html'));
      }
    }
    fs.writeFileSync(path.join(filePath, fileName + '.md'), data.content, 'utf-8')
    fs.writeFileSync(path.join(filePath, fileName + '.html'), html, 'utf-8')
    ctx.body = {code: 200, message: message}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/getArticle', async (ctx) => {
  try {
    const checkResult = checkRoot(ctx)
    const data = ctx.request.body.data
    let result
    if (data.admin) {
      // 后台管理列表
      if (checkResult.code === 500) {
        ctx.body = checkResult
        return
      }
      result = await Article.find({}, {summary: 0, content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.summary) {
      // home首页列表
      result = await Article.find({state: 1}, {content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.hot) {
      // 热门列表
      result = await Article.find({state: 1}, {content: 0, html: 0, comment: 0}).populate('tag')
    } else if (data.catalog) {
      // 归档目录
      result = await Article.find({state: 1}, {summary: 0, content: 0, html: 0, comment: 0}).sort({createTime:-1}).populate('tag')
    } else if (data.markdown) {
      // markdown 修改内容
      if (checkResult.code === 500) {
        ctx.body = checkResult
        return
      }
      result = await Article.find({_id: data.id}, {comment: 0}).populate('tag')
      if (result.length !== 0) {
        const title = result[0].title
        const content = fs.readFileSync(path.join(filePath, `${data.id}_${title}.md`), 'utf-8')
        result[0].content = content
      }
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

router.post('/deleteArticle', async (ctx) => {
  try {
    const checkResult = checkRoot(ctx)
    if (checkResult.code === 500) {
      ctx.body = checkResult
      return
    }
    const data = ctx.request.body.data
    const userInfo = ctx.session.userInfo
    const id = data.id, title = data.title
    const article = await Article.find({_id: id}, {summary: 0, content: 0, html: 0, comment: 0})
    if (article[0].user != userInfo.id && userInfo.root !== 1) {
      ctx.body = {code: 200, message: '没有权限'}
      return
    }
    await Article.remove({_id: data.id})
    fs.unlinkSync(path.join(filePath, `${id}_${title}.md`))
    fs.unlinkSync(path.join(filePath, `${id}_${title}.html`))
    ctx.body = {code: 200, message: '删除成功'}
  } catch(err) {
    throw new Error(err)
  }
})

module.exports = router