const mongoose = require('mongoose')
const db = 'mongodb://localhost/blog'
const glob = require('glob')//node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
const { resolve } = require('path')//resolve: 将一系列路径或路径段解析为绝对路径
mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)//使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来
}

exports.connect = () => {
    //连接数据库
    mongoose.connect(db,{useCreateIndex: true,useNewUrlParser:true})

    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', () => {
            console.log("=======数据库断开======")
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                //进行重连
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出现问题,请人为修理')
            }

        })
        mongoose.connection.on('error', err => {
            console.log("=======数据库错误======")
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                //进行重连
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('数据库出现问题,请人为修理')
            }

        })

        mongoose.connection.once('open', () => {
            console.log("connected successfully!");
            resolve()
        })
    })

}
