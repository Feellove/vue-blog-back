const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const ClassesSchema = new Schema({
  classesId: ObjectId,
  classesName: String,
  classesDesc: String,
})
mongoose.model('Classes',ClassesSchema)
