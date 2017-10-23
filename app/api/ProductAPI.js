const ProductAPI = {
  products: [
    { id: 1, name: 'Овсянка' },
    { id: 2, name: 'Рис' },
    { id: 3, name: 'Молоко' }
  ],
  
  all: function() { return this.products }
}

export default ProductAPI
