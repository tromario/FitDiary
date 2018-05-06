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
  // история
  history: { type: Schema.Types.ObjectId, ref: 'History', required: false },
  // продукты и их количество
  products: {
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
      // TODO: Replaced by weight
      amount: { type: Number, default: 0, required: false },

      // Добавляю характеристики для быстрого рендеринга на клиенте
      // Чтобы не выполнять расчеты КБЖУ на клиенте для каждого продукта и всего приема
      // белки
      proteins: { type: Number, default: 0, required: false },
      // жиры
      fats: { type: Number, default: 0, required: false },
      // углеводы
      carbohydrates: { type: Number, default: 0, required: false },
      // клетчатка
      cellulose: { type: Number, default: 0, required: false },
      // калорийность
      caloricity: { type: Number, default: 0, required: false },
      // энергетическая ценность
      energy: { type: Number, default: 0, required: false }
    }]
  },
  // количество
  totalAmount: { type: Number, default: 0, required: false },
  // белки
  totalProteins: { type: Number, default: 0, required: false },
  // жиры
  totalFats: { type: Number, default: 0, required: false },
  // углеводы
  totalCarbohydrates: { type: Number, default: 0, required: false },
  // клетчатка
  totalCellulose: { type: Number, default: 0, required: false },
  // калорийность
  totalCaloricity: { type: Number, default: 0, required: false },
  // энергетическая ценность
  totalEnergy: { type: Number, default: 0, required: false }
},
{
  versionKey: false
})

// TODO: Если понадобится возвращать дату в формате
// mealSchema.set('toObject', { getters: true });
// mealSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Meal', mealSchema)