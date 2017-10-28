import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../actions/ProductActions'

import ProductList from '../components/Product/ProductList'

// Переименовать в ProductListContainer
class ProductListPage extends Component {
  render() {
    const { getProducts, addProduct, deleteProduct } = this.props.productActions
    const { products } = this.props.product

    return (
      <ProductList
        items={products}
        getProducts={getProducts}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(ProductActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
