const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const articleSchema = new Schema({
  articleId: ObjectId,
  articleName: String,
  articleImgurl: String,
  articleContent: String,
  articleClasses: String,
  clickTimes: {
    type: Number,
    default: 0,
  },
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
},{
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

mongoose.model('Articles', articleSchema)
