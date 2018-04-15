const mongoose = require('mongoose')
const Meal = require('../models/mealModel')

exports.getMeals = function(req, res) {
    // mongoose.connect(url)
    Meal.find().populate('products.product').exec(function(err, docs) {
        // mongoose.disconnect()
        if (err) return res.status(400).send()
        res.json(docs)
    })
}