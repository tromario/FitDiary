const mongoose = require('mongoose')
const Category = require('../models/categoryModel')

exports.getCategories = function(req, res) {
  // mongoose.connect(url)
  Category.find({}, function(err, docs) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(docs)
  })
}

exports.getCategory = function(req, res) {
  var categoryId = req.params.id

  // mongoose.connect(url)
  Category.findById(categoryId, function(err, category) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(category)
  })
}

exports.createCategory = function(req, res) {
  if (!req.body) return res.status(404).send()

  var categoryData = req.body.data
  var category = new Category(categoryData)

  console.log(categoryData)

  // mongoose.connect(url)
  category.save()
    .then(function(doc) {
      // mongoose.disconnect()
      res.json(doc)
    })
    .catch(function(err) {
      // mongoose.disconnect()
      res.status(400).send()
    })
}

exports.deleteCategory = function(req, res) {
  var id = req.params.id

  console.log(req.params)

  // mongoose.connect(url)
  Category.findByIdAndRemove(id, function(err, doc) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(doc)
  })
}

// app.delete('/api/categories', function(req, res) {
//   var id = req.query.id
//
//   console.log(req.query)
//   console.log(req.params)
//
//   mongoose.connect(url)
//   Category.findByIdAndRemove(id, function(err, doc) {
//     mongoose.disconnect()
//     if (err) return res.status(400).send()
//     res.json(doc)
//   })
// })

exports.updateCategory = function(req, res) {
  if (!req.params) return res.status(404).send()

  var categoryId = req.params.id
  var categoryData = req.body.data

  // mongoose.connect(url)

  Category.findById(categoryId, function(err, category) {
    category.name = categoryData.name
    category.save()
      .then(function(category) {
        // mongoose.disconnect()
        res.json(category)
      })
      .catch(function(err) {
        // mongoose.disconnect()
        res.status(400).send()
      })
  })
}