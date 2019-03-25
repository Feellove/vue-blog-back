const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init')
const bodyParser = require('koa-bodyparser') //中间件
const cors = require('koa2-cors') //跨域
const Router = require('koa-router') //路由


//加载路由中间件

app.use(bodyParser())
app.use(cors())

let user = require('./api/user.js')
let article = require('./api/article.js')
let classes = require('./api/classes.js')
let message = require('./api/message.js')


//装载所有子路由
let router = new Router()
// router.use('/user',user.routes())
router.use('/article',article.routes())
router.use('/classes',classes.routes())
router.use('/message',message.routes())
app.use(router.routes())
app.use(router.allowedMethods())
;(async () => {
  await connect()
  initSchemas()
})()

app.use(async (ctx) => {
  ctx.body = `<h1>Feelman</h1>`
})
app.listen(3333, () => {
  console.log("port:3333");
})
