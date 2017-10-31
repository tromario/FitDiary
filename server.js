const http = require('http');
const express = require('express');
const initParsers = require('./middleware/parser')
const fs = require('fs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));

  initParsers(app)
})();

// todo: разобраться, почему не работает с ajax
// app.get(/.*/, function root(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

/* api [ */

mongoose.Promise = global.Promise

const url = 'mongodb://localhost:27017/diary'
// const jsonParser = bodyParser.json()

// todo: вынести в model
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

// схема категории продукта: (молочное/злаковое/бобовое)
var categorySchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, require: true },
  name: { type: String, require: true }
},
{
  versionKey: false
})

const Product = mongoose.model('Product', productSchema)
const Category = mongoose.model('Category', categorySchema)

app.get('/api/products', function(req, res) {
  mongoose.connect(url)
  Product.find().populate('category').exec(function(err, docs) {
    mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(docs)
  })
})

app.post('/api/products', function(req, res) {
  if (!req.body) return res.status(404).send()

  var productData = req.body.data
  var product = new Product(productData)

  console.log(productData)

  mongoose.connect(url)
  product.save(function(error) {
    if (!error) {
      Product
        .findById(product._id)
        .populate('category')
        .exec(function(error, doc) {
          mongoose.disconnect()
          res.json(doc)
        })
    } else {
      mongoose.disconnect()
      res.status(400).send()
    }
  })
})

app.get('/api/categories', function(req, res) {
  mongoose.connect(url)
  Category.find({}, function(err, docs) {
    mongoose.disconnect()
    if (err) return res.status(400).send()
    res.json(docs)
  })
})

app.post('/api/categories', function(req, res) {
  if (!req.body) return res.status(404).send()

  var categoryData = req.body.data
  var category = new Category(categoryData)

  console.log(categoryData)

  mongoose.connect(url)
  category.save()
    .then(function(doc) {
      mongoose.disconnect()
      res.json(doc)
    })
    .catch(function(err) {
      mongoose.disconnect()
      res.status(400).send()
    })
})

/* api ] */

const server = http.createServer(app);
server.listen(process.env.PORT || 3001, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
