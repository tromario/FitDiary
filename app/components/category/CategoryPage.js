import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CategoryActions from '../../actions/CategoryActions'

import CategoryForm from './CategoryForm'

class CategoryPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      name: ''
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params
    const { category } = this.props.category
    const { getCategory } = this.props.categoryActions

    getCategory(id, this.setParametersAfterQueryExecuted)
  }

  setParametersAfterQueryExecuted = () => {
    // TODO: заменить на promise
    const { category } = this.props.category

    this.setState({name: category.name})
  }

  handleUpdate = values => {
    const { id } = this.props.match.params
    const { updateCategory } = this.props.categoryActions
    const { history } = this.context.router

    var data = {
      id: id,
      name: values.name
    }

    updateCategory(data)

    // todo: подумать, как сделать редирект через dispatch
    history.push('/categories')
  }

  handleToggleEditClick = () => {
    this.setState({isEditing: true})
  }

  handleDeleteClick = () => {
    const { id } = this.props.match.params
    const { deleteCategory } = this.props.categoryActions

    deleteCategory(id)
  }

  render() {
    const { category } = this.props.category
    const { isEditing } = this.state

    if (isEditing) {
      return(
        <div>
          <h3>Изменение категории</h3>
          <CategoryForm
            category={category}
            handleSubmit={this.handleUpdate}
          />
        </div>
      )
    }

    return(
      <div>
        <h3>Просмотр категории</h3>
        <p>Наименование: {this.state.name}</p>

        <button onClick={this.handleToggleEditClick}>Изменить</button>{' '}
        <button onClick={this.handleDeleteClick}>Удалить</button>
      </div>
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
