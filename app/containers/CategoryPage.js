import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CategoryActions from '../actions/CategoryActions'

import Category from '../components/Category/Category'

// todo: подумать об объединении контейнера и компонента в один класс
class CategoryPage extends Component {
  render() {
    const { id } = this.props.match.params
    const { category } = this.props.category
    const { getCategory, updateCategory } = this.props.categoryActions

    return(
      <Category
        id={id}
        category={category}
        getCategory={getCategory}
        updateCategory={updateCategory}
      />
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
