const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const { getRandom } = require('./tool')
const Character = require('../database/schema/character')

router.get('/insertCharacterByJson', async (ctx) => {

})

router.get('/getCharacterList', async (ctx) => {

})

router.post('/getCharacterInfo', async (ctx) => {

})

module.exports = router