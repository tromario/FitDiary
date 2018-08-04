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

exports.getProduct = function(req, res) {
  var productId = req.params.id

  // mongoose.connect(url)
  Product.findById(productId).populate('category').exec(function(err, product) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(product)
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

exports.deleteProduct = function(req, res) {
  var id = req.params.id

  console.log(req.params)

  // mongoose.connect(url)
  Product.findByIdAndRemove(id, function(err, doc) {
    // mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(doc)
  })
}

exports.updateProduct = function(req, res) {
  if (!req.params) return res.status(404).send()

  var productId = req.params.id
  var productData = req.body.data

  // mongoose.connect(url)

  Product.findById(productId, function(err, product) {
    for (var key in productData) {
      if (key != 'id') product[key] = productData[key];
    }
    
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
  })
}