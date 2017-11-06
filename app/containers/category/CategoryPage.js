import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CategoryActions from '../../actions/CategoryActions'

import Category from '../../components/Category/Category'


function mapStateToProps(state) {
  return {
    category: state.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
