module.exports = function(app) {
    const category = require('../controllers/categoryController')

    app.route('/api/categories')
        .get(category.getCategories)
        .post(category.createCategory)
        
    app.route('/api/categories/:id')
        .get(category.getCategory)
        .delete(category.deleteCategory)
        .put(category.updateCategory)
}