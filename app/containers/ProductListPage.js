import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../actions/ProductActions'

import ProductList from '../components/Product/ProductList'

class ProductListPage extends Component {
  render() {
    const { getProducts, addProduct, deleteProduct } = this.props.productActions

    return (
      <ProductList
        items={this.props.product.products}
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
