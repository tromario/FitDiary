const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema(
    {
        //_id: { type: Schema.Types.ObjectId, require: false },
        // дата приема
        date: { type: Date, default: Date.now },
        // приемы пищи
        meals: [{ type: Schema.Types.ObjectId, ref: 'Meal', required: false }],
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
        versionKey: false,
        
        // MongoError: Unknown modifier: $pushAll
        // https://medium.com/@stefanledin/how-to-solve-the-unknown-modifier-pushall-error-in-mongoose-d631489f85c0
        usePushEach: true 
    }
)

// TODO: Выяснить, что эффективнее: виртуальный метод или поле в таблице, связанное по id 
/*
historySchema.virtual('meals', {
    ref: 'Meal',
    localField: '_id',
    foreignField: 'history'
})

historySchema.set('toObject', { virtuals: true });
historySchema.set('toJSON', { virtuals: true });
*/

module.exports = mongoose.model('History', historySchema)