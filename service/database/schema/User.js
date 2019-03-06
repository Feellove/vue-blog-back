const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
//创建用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
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