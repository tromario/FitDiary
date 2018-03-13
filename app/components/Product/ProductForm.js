import React, { Component, PropTypes } from 'react'

export default class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.product
        }
    }

    handleNameChange = event => {
        var value = event.target.value;

        const { product } = this.state;
        product.name = value;

        this.setState({
            product: product
        })
    }

    handlePriceChange = event => {
        var value = event.target.value;
        // let value = parseInt(event.target.value)

        const { product } = this.state;
        product.price = value;

        this.setState({
            product: product
        })
    }

    handleCategoryChange = event => {
        let categoryId = event.target.value

        const { product } = this.state;
        product.category = categoryId;

        this.setState({
            product: product
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { handleSubmit } = this.props

        var values = {
            name: this.state.product.name,
            price: this.state.product.price,
            category: this.state.product.category
        };

        handleSubmit(values);
    }

    handleBackwardClick = () => {
        const { handleBackward } = this.props;

        handleBackward();
    }

    render() {
        const { categories } = this.props
        
        return (
            <form action="#" method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="name">Наименование:</label>
                <input type="text" name="name" id="name" value={this.state.product.name} onChange={this.handleNameChange} />
                <br />
                <label htmlFor="count">Цена:</label>
                <input type="text" name="price" id="price" value={this.state.product.price} onChange={this.handlePriceChange} />
                <br />
                <label htmlFor="category">Категория:</label>
                <select name="category" onChange={this.handleCategoryChange}>
                    {
                        categories.map(function (item, index) {
                            return (
                                <option key={index} value={item._id}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <br />
                <button onClick={this.handleBackwardClick}>Назад</button>{' '}
                <input type="submit" value="Сохранить" />
            </form>
        )
    }
}

ProductForm.defaultProps = {
    product: {
        name: '',
        price: 0,
        category: null
    }
}
