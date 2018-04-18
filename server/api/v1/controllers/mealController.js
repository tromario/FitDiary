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

exports.createMeal = function(req, res) {
    if (!req.body) return res.status(404).send();
  
    var mealData = req.body.data;
    var meal = new Meal(mealData);
  
    console.log('data from query - createMeal: ', mealData);
  
    // mongoose.connect(url)
    meal.save(function(error) {
      if (!error) {
        Meal
          .findById(meal._id)
          .populate('products.product')
          .exec(function(error, doc) {
            // mongoose.disconnect()
            res.json(doc);
          })
      } else {
        // mongoose.disconnect()
        res.status(400).send();
      }
    })
  }