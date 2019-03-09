const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
//创建用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
})
/**
 * bcrypt是一种跨平台的文件加密工具
 * 它的口令必须是8至56个字符，并将在内部被转化为448位的密钥
 */
userSchema.pre('save', function(next){//用pre每次进行保存时都进行加盐加密的操作
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt,(err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      })
  })
})
userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if (!err) {
                    resolve(isMatch)
                } else {
                    reject(err)
                }
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema)
