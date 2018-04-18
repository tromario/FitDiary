module.exports = function(app) {
    const mealController = require('../controllers/mealController')

    app.route('/api/v1/meals')
        .get(mealController.getMeals)
        .post(mealController.createMeal)

    app.route('/api/v1/meals/:id')
        .get(mealController.getMeal)
        .delete(mealController.deleteMeal)
        .put(mealController.updateMeal)
}