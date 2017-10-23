import React from 'react';

export default class NewProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      category: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange = event => {
    let value = event.target.value
    this.setState({name: value})
  }

  handlePriceChange = event => {
    let value = parseInt(event.target.value)
    this.setState({price: value})
  }

  handleCategoryChange = event => {
    let value = event.target.value
    this.setState({category: value})
  }

  handleSubmit = event => {
    event.preventDefault()

    let data = {
      name: this.state.name,
      category: this.state.category,
      price: this.state.price
    }

    this.props.addProduct(data)
  }

  render() {
    return(
      <div>
        <h3>Добавление нового продукта</h3>
        <form action="#" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Наименование:</label>
          <input type="text" name="name" id="name" onChange={this.handleNameChange} />
          <br />
          <label htmlFor="count">Цена:</label>
          <input type="text" name="price" id="price" onChange={this.handlePriceChange} />
          <br />
          <label htmlFor="category">Категория:</label>
          <select name="category" onChange={this.handleCategoryChange}>
            <option value="0">Молочное</option>
            <option value="1">Крупы</option>
          </select>
          <br />
          <input type="submit" value="Сохранить" />
        </form>
      </div>
    )
  }
}
