const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()

router.post('/addClasses', async (ctx) => {
  const Classes = mongoose.model('Classes')
  let newClasses = new Classes(ctx.request.body)
  await newClasses.save().then(() => {
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
router.post('/getClasses', async (ctx) => {
  const Classes = mongoose.model('Classes')
  await Classes.find().sort({
    '_id': 1
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
router.post('/getOneClasses', async (ctx) => {
  const Classes = mongoose.model('Classes')
  await Classes.find({
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
router.post('/updateClasses', async (ctx) => {
  const Classes = mongoose.model('Classes')
  await Classes.updateOne({_id:ctx.request.body.id},{
    classesName: ctx.request.body.classesName,
    classesDesc: ctx.request.body.classesDesc
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
router.post('/delClasses', async (ctx) => {
  const Classes = mongoose.model('Classes')
  await Classes.deleteOne({
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
