const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
  // наименование
  name: { type: String, require: true },
  // дата приема
  date: { type: Date },
  // время начала
  start: { type: String },
  // время окончания
  end: { type: String },
  // продукты и их количество
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
    amount: { type: Number },
  }],
},
{
  versionKey: false
})

module.exports = mongoose.model('Meal', mealSchema)