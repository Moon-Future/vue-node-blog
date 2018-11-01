const Router = require('koa-router')
const router = new Router()
const Tag = require('../database/schema/tag')

router.post('/getTag', async (ctx) => {
  try {
    const result = await Tag.find({})
    ctx.body = {code: 200, message: result}
  } catch(err) {
    throw new Error(err)
  }
})

router.post('/getTagInfo', async (ctx) => {

})

module.exports = router