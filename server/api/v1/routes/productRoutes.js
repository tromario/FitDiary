module.exports = function(app) {
    const product = require('../controllers/productController')

    app.route('/api/v1/products')
        .get(product.getProducts)
        .post(product.createProduct)
}