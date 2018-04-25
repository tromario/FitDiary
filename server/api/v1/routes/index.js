const product = require('./productRoutes')
const category = require('./categoryRoutes')
const meal = require('./mealRoutes')

module.exports = function(app) {
    product(app)
    category(app)
    meal(app)
}