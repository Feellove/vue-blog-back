const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MessageSchema = new Schema({
  // commentUserName:String,
  commentTime:{
    type: Date,
    default:Date.now()
  },
  commentContent:String,
  commentreply:String
}, {
  timestamps: {
    createdAt: 'commentTime',
  }
})
mongoose.model('Message',MessageSchema)
