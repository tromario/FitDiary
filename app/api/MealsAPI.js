// TODO: REMOVE!
const MealsAPI = {
  meals: [
    { number: 1, products: ['Овсянка', 'Орехи'] },
    { number: 2, products: ['Бурый рис', 'Грудка'] }
  ],

  all: function() { return this.meals },
  add: function(number, product) {
    if (this.meals[number - 1] === undefined) {
      this.meals.push({number: number, products: [product]})
    } else {
      this.meals[number - 1].products.push(product)
    }
  },
  delete: function(mealNumber, productIndex) {
    var idx = this.meals.indexOf(mealNumber);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.meals.splice(idx, 1);
    }
  }
}

export default MealsAPI
