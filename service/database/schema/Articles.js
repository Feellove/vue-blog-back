const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  articleName: String,
  articleDesc: String,
  articleImgurl: String,
  articleContent: String,
  classesId: {
    type: Schema.Types.ObjectId,
    ref: 'Classes'
  },
  tags: Array,
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
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

mongoose.model('Articles', articleSchema)
