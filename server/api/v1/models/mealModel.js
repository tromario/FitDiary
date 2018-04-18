const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
  // наименование
  name: { type: String, require: true },
  // дата приема
  date: { type: Date, default: Date.now },
  // время начала
  startTime: { type: String },
  // время окончания
  endTime: { type: String },
  // продукты и их количество
  products: {
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
      amount: { type: Number },
    }]
  },
},
{
  versionKey: false
})

module.exports = mongoose.model('Meal', mealSchema)