const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const ClassesSchema = new({
  ClasseId: ObjectId,
  ClasseName: String,
  ClasseDesc: String,
})
mongoose.model('Classes',ClassesSchema)
