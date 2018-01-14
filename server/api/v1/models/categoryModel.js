const mongoose = require('mongoose')
const Schema = mongoose.Schema

// схема категории продукта: (молочное/злаковое/бобовое)
var categorySchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, require: true },
  name: { type: String, require: true }
},
{
  versionKey: false
})

module.exports = mongoose.model('Category', categorySchema)