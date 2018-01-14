module.exports = function(app) {
    const product = require('../controllers/productController')

    app.route('/api/products')
        .get(product.getProducts)
        .post(product.createProduct)
}