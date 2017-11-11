import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CategoryActions from '../../actions/CategoryActions'

class NewCategoryPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange = event => {
    let value = event.target.value
    this.setState({name: value})
  }

  handleSubmit = event => {
    event.preventDefault()

    const { createCategory } = this.props.categoryActions
    const { history } = this.context.router

    let data = {
      name: this.state.name
    }

    createCategory(data)

    // todo: подумать, как сделать редирект через dispatch
    history.push('/categories')
  }

  render() {
    return(
      <div>
        <h3>Добавление категории</h3>
        <form action="#" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Наименование:</label>
          <input type="text" name="name" id="name" onChange={this.handleNameChange} />
          <br />
          <input type="submit" value="Сохранить" />
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryPage)
