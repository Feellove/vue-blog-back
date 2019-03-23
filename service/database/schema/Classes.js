const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ClassesSchema = new Schema({
  classesName: String,
  classesDesc: String,
})
mongoose.model('Classes',ClassesSchema)
