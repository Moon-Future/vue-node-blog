const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const connect = require('./database/init')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const static = require('koa-static')
const path = require('path')
const router = require('./router')

;(async () => {
  await connect()
})()

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}
app.keys = ['login secret']
app.use(session(CONFIG, app));

app.use(static(path.join(__dirname, '../dist')));
app.use(bodyParser())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3001, () => {
  console.log('listen at port 3001...')
})