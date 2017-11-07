import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../../actions/ProductActions'
import * as CategoryActions from '../../actions/CategoryActions'

import ProductList from '../../components/product/ProductList'


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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
