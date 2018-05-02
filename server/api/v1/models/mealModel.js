const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

function formatDate(date) {
  if (!date) return date;
  return moment(date).format('YYYY-MM-DD');
}
 
const mealSchema = new Schema({
  // наименование
  name: { type: String, require: true },
  // дата приема
  date: { type: Date, get: formatDate, default: Date.now },
  // время начала
  startTime: { type: String },
  // время окончания
  endTime: { type: String },
  // продукты и их количество
  products: {
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
      amount: { type: Number },
      // TODO: Добавить поля с КБЖУ для 1 продукта
    }]
  },
  // TODO: Добавить поля с КБЖУ для 1 приема пищи
},
{
  versionKey: false
})

// TODO: Если понадобится возвращать дату в формате
// mealSchema.set('toObject', { getters: true });
// mealSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Meal', mealSchema)