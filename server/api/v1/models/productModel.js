const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        //_id: { type: Schema.Types.ObjectId, require: false },
        // наименование
        name: {type: String, require: true},
        // // категория
        category: {type: Schema.Types.ObjectId, ref: "Category", require: true},
        // // производитель
        // manufacturer: { type: String, require: true },
        // пищевая ценность для веса / размер порции
        portionSize: {type: Number, default: 100, required: false},
        // // белки
        proteins: {type: Number, default: 0, require: false},
        // // жиры
        fats: {type: Number, default: 0, require: false},
        // // углеводы
        carbohydrates: {type: Number, default: 0, require: false},
        // // клетчатка
        cellulose: {type: Number, default: 0, require: false},
        // // калорийность
        caloricity: {type: Number, default: 0, require: false},
        // // энергетическая ценность
        energy: {type: Number, default: 0, require: false},
        // // гликемический индекс
        glycemicIndex: {type: Number, default: 0, require: false},
        // // инсулиновый индекс
        insulinIndex: {type: Number, default: 0, require: false},
        // // мое мнение (отзыв)
        // my_review: { type: String, require: false },
        // // изображение
        // picture: { type: Buffer, require: false },
        // цена
        price: {type: Number, default: 0, require: false}
    },
    {
        versionKey: false
    });

module.exports = mongoose.model("Product", productSchema);