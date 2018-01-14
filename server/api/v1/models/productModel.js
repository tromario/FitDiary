const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  //_id: { type: Schema.Types.ObjectId, require: false },
  // наименование
  name: { type: String, require: true },
  // // категория
  category: { type: Schema.Types.ObjectId, ref: 'Category', require: true },
  // // производитель
  // manufacturer: { type: String, require: true },
  // // белки
  // proteins: { type: Number, require: false },
  // // жиры
  // fats: { type: Number, require: false },
  // // углеводы
  // carbohydrates: { type: Number, require: false },
  // // клетчатка
  // cellulose: { type: Number, require: false },
  // // калорийность
  // caloricity: { type: Number, require: false },
  // // энергетическая ценность
  // energy_value: { type: Number, require: false },
  // // гликемический индекс
  // glycemic_index: { type: Number, require: false },
  // // инсулиновый индекс
  // insulin_index: { type: Number, require: false },
  // // мое мнение (отзыв)
  // my_review: { type: String, require: false },
  // // изображение
  // picture: { type: Buffer, require: false },
  // цена
  price: { type: Number, require: false }
},
{
  versionKey: false
})

module.exports = mongoose.model('Product', productSchema)