const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
    const User = mongoose.model('User')
    await User.findOne({ userName: userName }).exec()
        .then(async (result) => {
            console.log(result)
            if (result) {
                let newUser = new User()
                await newUser.comparePassword(password, result.password)
                    .then((isMatch) => {
                        ctx.body = { code: 200, message: isMatch }
                    })
                    .catch(error => {
                        console.log(error)
                        ctx.body = { code: 500, message: error }
                    })
            } else {
                ctx.body = { code: 200, message: '用户不存在' }
            }
        })
        .catch(error => {
            console.log(error)
            ctx.body = { code: 500, message: error }

        })
})
module.exports = router