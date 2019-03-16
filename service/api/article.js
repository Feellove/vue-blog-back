const Router = require('koa-router')
const mongoose = require('mongoose')
const multer = require('koa-multer')
let router = new Router()
let storage = multer.diskStorage({
  //文件保存路径
  destination: (request, file, cb) => {
    cb(null, 'E:/vueDemo/vue-blog-front/static/public/uploads/')
  },
  //修改文件名称
  filename: (request, file, cb) => {
    let fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
let upload = multer({
  storage: storage
});
//路由
router.post('/upload',upload.single('file'), async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = {
    filename: ctx.req.file,//返回文件名
    code: 200,
    message: '成功'
  }
})
router.post('/addArticle', async (ctx) => {
  console.log(ctx.request.body);
  const Articles = mongoose.model('Articles')
  let newArticles = new Articles(ctx.request.body)
  await newArticles.save().then(() => {
    ctx.body = {
      code: 200,
      message: '成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
router.post('/deleteArticle', async (ctx) => {
  let _id = ctx.request.body._id;
  const Articles = mongoose.model('Articles')
  await Articles.deleteOne({
      _id: _id
    })
    .then(() => {
      ctx.body = {
        code: 200,
        message: '成功'
      }
    }).catch(error => {
      ctx.body = {
        code: 500,
        message: error
      }
    })

})

router.post('/updateArticle', async (ctx) => {
  let _id = ctx.request.body._id;
  let articleName = ctx.request.body.articleName;
  let articleDesc = ctx.request.body.articleDesc;
  let articleImgurl = ctx.request.body.articleImgurl;
  let articleClasses = ctx.request.body.articleClasses;
  let articleContent = ctx.request.body.articleContent;
  const Articles = mongoose.model('Articles')
  await Articles.updateOne({
    _id: _id
  }, {
    articleName: articleName,
    articleDesc: articleDesc,
    articleImgurl: articleImgurl,
    articleClasses: articleClasses,
    articleContent: articleContent
  }).then(() => {
    ctx.body = {
      code: 200,
      message: '成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })

})

router.post('/getArticleList', async (ctx) => {
  let currentPage = ctx.request.body.currentPage;
  let pageSize = ctx.request.body.pageSize;
  const Articles = mongoose.model('Articles')
  let c = 0;
  Articles.countDocuments({}, function (err, count) {
    c = count
  })
  if (currentPage && pageSize) {
    await Articles.find().sort({
        '_id': -1
      }).limit(pageSize)
      .skip((currentPage - 1) * pageSize)
      .then(res => {
        let result = {
          data: res,
          total: c
        }
        ctx.body = {
          code: 200,
          message: result
        }
      }).catch(error => {
        ctx.body = {
          code: 500,
          message: error
        }
      })
  } else {
    await Articles.find().sort({
        '_id': -1
      })
      .then(res => {
        let result = {
          data: res,
          total: c
        }
        ctx.body = {
          code: 200,
          message: result
        }
      }).catch(error => {
        ctx.body = {
          code: 500,
          message: error
        }
      })
  }

})

router.post('/getOneArticle', async (ctx) => {
  let id = ctx.request.body._id;
  const Articles = mongoose.model('Articles')
  await Articles.findById(id)
    .then(res => {
      console.log(res);
      ctx.body = {
        code: 200,
        message: res
      }
    }).catch(error => {
      ctx.body = {
        code: 500,
        message: error
      }
    })

})

module.exports = router
