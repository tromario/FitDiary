import React, { Component, PropTypes } from 'react'

export default class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: this.props.category
    }
  }

  handleNameChange = event => {
    var value = event.target.value;
    
    const { category } = this.state;
    category.name = value;

    this.setState({
      category: category
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { handleSubmit } = this.props

    // var data = {}
    // if (this.state.category) data.id = this.state.category._id
    // data.name = this.state.name

    var values = {
      name: this.state.category.name
    }

    handleSubmit(values)
  }

  handleBackwardClick = () => {
    const { handleBackward } = this.props;

    handleBackward();
  }

  render() {
    return(
      <form action="#" method="post" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Наименование:</label>
        <input type="text" name="name" id="name" value={this.state.category.name} onChange={this.handleNameChange} />
        <br />
        <button onClick={this.handleBackwardClick}>Назад</button>{' '}
        <input type="submit" value="Сохранить" />
      </form>
    )
  }
}

CategoryForm.defaultProps = {
  category: {
    name: ''
  }
}
