import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../actions/ProductActions'
import * as CategoryActions from '../actions/CategoryActions'

import ProductList from '../components/Product/ProductList'

// Переименовать в ProductListContainer
class ProductListPage extends Component {
  componentDidMount() {
    const { getProducts } = this.props.productActions
    const { getCategories } = this.props.categoryActions

    getProducts()
    getCategories()
  }

  render() {
    const { addProduct, deleteProduct } = this.props.productActions

    const { products } = this.props.product
    const { categories } = this.props.category

    return (
      <ProductList
        items={products}
        categories={categories}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    category: state.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(ProductActions, dispatch),
    categoryActions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
