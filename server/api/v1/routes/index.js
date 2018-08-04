const product = require('./productRoutes')
const category = require('./categoryRoutes')
const meal = require('./mealRoutes')
const history = require('./historyRoutes')

module.exports = function(app) {
    product(app)
    category(app)
    meal(app)
    history(app)
}