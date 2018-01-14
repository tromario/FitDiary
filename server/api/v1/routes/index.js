const product = require('./productRoutes')
const category = require('./categoryRoutes')

module.exports = function(app) {
    product(app)
    category(app)
}