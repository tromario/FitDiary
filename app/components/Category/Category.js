import React, { Component } from 'react'

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { id, getCategory } = this.props

    getCategory(id, this.setParametersAfterQueryExecuted)
  }

  setParametersAfterQueryExecuted = () => {
    const { category } = this.props
    this.setState({name: category.name})
  }

  handleNameChange = event => {
    var value = event.target.value
    this.setState({name: value})
  }

  handleSubmit = event => {
    // todo: после обновления сделать редирект на список категорий
    event.preventDefault()

    const { id, updateCategory } = this.props

    var data = {
      id: id,
      name: this.state.name
    }

    updateCategory(data)
  }

  render() {
    return(
      <div>
        <h3>Изменение категории</h3>
        <form action="#" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Наименование:</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleNameChange} />
          <br />
          <input type="submit" value="Сохранить" />
        </form>
      </div>
    )
  }
}
