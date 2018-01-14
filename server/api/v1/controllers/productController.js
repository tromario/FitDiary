const mongoose = require('mongoose')
const Product = require('../models/productModel')

exports.getProducts = function(req, res) {
  // mongoose.connect(url)
  Product.find().populate('category').exec(function(err, docs) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(docs)
  })
}

exports.createProduct = function(req, res) {
  if (!req.body) return res.status(404).send()

  var productData = req.body.data
  var product = new Product(productData)

  console.log(productData)

  // mongoose.connect(url)
  product.save(function(error) {
    if (!error) {
      Product
        .findById(product._id)
        .populate('category')
        .exec(function(error, doc) {
          // mongoose.disconnect()
          res.json(doc)
        })
    } else {
      // mongoose.disconnect()
      res.status(400).send()
    }
  })
}