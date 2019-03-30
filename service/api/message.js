const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()

router.post('/addMessage', async (ctx) => {
  const Message = mongoose.model('Message')
  let newMessage = new Message(ctx.request.body)
  await newMessage.save().then(() => {
    ctx.body = {
      code: 200,
      message: '成功'
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error
    }
  })


})
router.post('/getMessage', async (ctx) => {
  const Message = mongoose.model('Message')
  await Message.find().sort({
    '_id': -1
  }).then(res => {
    ctx.body = {
      code: 200,
      message: res
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error
    }
  })

})

router.post('/updateMessage', async (ctx) => {
  const Message = mongoose.model('Message')
  await Message.updateOne({_id:ctx.request.body.id},{
    commentreply: ctx.request.body.commentreply
  }).then(res => {
    ctx.body = {
      code: 200,
      message: res
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
router.post('/delMessage', async (ctx) => {
  const Message = mongoose.model('Message')
  await Message.deleteOne({
    _id: ctx.request.body.id
  }).then(res => {
    ctx.body = {
      code: 200,
      message: res
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error
    }
  })

})
module.exports = router
