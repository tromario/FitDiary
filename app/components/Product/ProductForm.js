import React, { Component, PropTypes } from 'react'

// TODO: Доработать выбор категории по умолчанию при просмотре продукта
// TODO: Очищать форму после создания/просмотра продукта
export default class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.product
        }
    }

    handleTextFieldChange = event => {
        var name = event.target.name;
        var value = event.target.value;

        const { product } = this.state;
        product[name] = value;

        this.setState({
            product: product
        })

        console.log(product)
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

        handleSubmit(this.state.product);
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
                <input type="text" name="name" id="name" value={this.state.product.name} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="proteins">Белки:</label>
                <input type="text" name="proteins" id="proteins" value={this.state.product.proteins} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="fats">Жиры:</label>
                <input type="text" name="fats" id="fats" value={this.state.product.fats} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="carbohydrates">Углеводы:</label>
                <input type="text" name="carbohydrates" id="carbohydrates" value={this.state.product.carbohydrates} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="cellulose">Клетчатка:</label>
                <input type="text" name="cellulose" id="cellulose" value={this.state.product.cellulose} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="caloricity">Калорийность:</label>
                <input type="text" name="caloricity" id="caloricity" value={this.state.product.caloricity} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="energy">Энергетичкская ценность:</label>
                <input type="text" name="energy" id="energy" value={this.state.product.energy} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="glycemicIndex">Гликемический индекс:</label>
                <input type="text" name="glycemicIndex" id="glycemicIndex" value={this.state.product.glycemicIndex} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="insulinIndex">Инсулиновый индекс:</label>
                <input type="text" name="insulinIndex" id="insulinIndex" value={this.state.product.insulinIndex} onChange={this.handleTextFieldChange} />
                <br />
                <label htmlFor="count">Цена:</label>
                <input type="text" name="price" id="price" value={this.state.product.price} onChange={this.handleTextFieldChange} />
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
