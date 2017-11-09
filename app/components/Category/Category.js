import React, { Component } from 'react'

export default class Category extends Component {
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
    const { category } = this.props.category

    this.setState({name: category.name})
  }

  handleNameChange = event => {
    var value = event.target.value
    this.setState({name: value})
  }

  handleSubmit = event => {
    // todo: после обновления сделать редирект на список категорий
    event.preventDefault()

    const { id } = this.props.match.params
    const { updateCategory } = this.props.categoryActions

    var data = {
      id: id,
      name: this.state.name
    }

    updateCategory(data)
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
    if (this.state.isEditing) {
      return(
        <div>
          <form action="#" method="post" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Наименование:</label>
            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleNameChange} />
            <br />
            <input type="submit" value="Сохранить" />
          </form>
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
