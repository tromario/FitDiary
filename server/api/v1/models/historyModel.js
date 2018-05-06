const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema(
    {
        //_id: { type: Schema.Types.ObjectId, require: false },
        // дата приема
        date: { type: Date, default: Date.now },
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
    }
)

module.exports = mongoose.model('History', historySchema)