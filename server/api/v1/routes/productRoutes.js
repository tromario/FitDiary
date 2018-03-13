module.exports = function(app) {
    const product = require('../controllers/productController')

    app.route('/api/v1/products')
        .get(product.getProducts)
        .post(product.createProduct)
        
    app.route('/api/v1/products/:id')
        .get(product.getProduct)
        .delete(product.deleteProduct)
        .put(product.updateProduct)
}