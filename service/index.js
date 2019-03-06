const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init')
const bodyParser = require('koa-bodyparse')
const cors = require('koa2-cors')
const Router = require('koa-router')
let user = require('./api/user.js')
let router = new Router()
router.use('/user', user.routes())
app.use(router.routes)
app.use(router.allowedMethods)
app.user(bodyParser())
app.use(cors())
    ; (async () => {
        await connect()
        initSchemas()
        const User = mongoose.model('User')
        let oneUser = new User({ userName: 'jspang', password: '123456' })
        oneUser.save().then(() => {
            console.log('插入成功');
        })
        let users = await User.findOne({}).exec()
        console.log('用户数据' + users);
    })()

app.use(async (ctx) => {
    ctx.body = `<h1>Feelman</h1>`
})
app.listen(3000, () => {
    console.log("port:3000");
})