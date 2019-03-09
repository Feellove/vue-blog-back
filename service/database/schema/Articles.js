const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema({
  articleId: ObjectId,
  articleName: String,
  articleContent: String,
  articleClasses: String,
  clickTimes: {
    type: Number,
    default: 0,
  },
  createTime: {
    type: Date,
    default: Date,
    get: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
  },
  updateTime: {
    type: Date,
    default: Date
  }
})

mongoose.model('Articles', articleSchema)
