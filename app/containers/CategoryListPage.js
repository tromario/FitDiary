import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CategoryActions from '../actions/CategoryActions'

import CategoryList from '../components/Category/CategoryList'

class CategoryListPage extends Component {
  render() {
    const { categories } = this.props.category
    const { getCategories, addCategory, deleteCategory } = this.props.categoryActions

    return(
      <CategoryList
        items={categories}
        getCategories={getCategories}
        addCategory={addCategory}
        deleteCategory={deleteCategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListPage)
