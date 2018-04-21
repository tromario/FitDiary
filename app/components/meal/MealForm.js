import React, { Component, PropTypes } from 'react'

export default class MealForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meal: this.props.meal
        }
    }

    handleDateChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.date = value;

        this.setState({ meal });
    }

    handleNameChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.name = value;

        this.setState({ meal });
    }

    handleStartTimeChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.startTime = value;

        this.setState({ meal });
    }

    handleEndTimeChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.endTime = value;

        this.setState({ meal });
    }

    handleAddProductClick = () => {
        const { meal } = this.state;   
        const { products } = this.props;

        let product = products.length > 0 ? products[0] : '';

        meal.products.push({
            product: product,
            amount: 0
        });        
        this.setState({ meal });
    }

    handleRemoveProductClick = index => {
        const { meal } = this.state;
        const deleteCountProduct = 1;

        meal.products.splice(index, deleteCountProduct);
        this.setState({ meal });
    }

    handleProductChange = event => {
        let productId = event.target.value;
        let name = event.target.name;
        let index = event.target.getAttribute('data-index');
        
        const { meal } = this.state;
        meal.products[index].product = productId;

        this.setState({ meal });
    }

    handleAmountChange = event => {
        let amount = event.target.value;
        let index = event.target.getAttribute('data-index');
        
        const { meal } = this.state;
        meal.products[index].amount = amount;

        this.setState({ meal });
    }

    handleSubmit = event => {
        event.preventDefault()

        const { handleSubmit } = this.props

        handleSubmit(this.state.meal)
    }

    handleBackwardClick = () => {
        const { handleBackward } = this.props;

        handleBackward();
    }

    render() {
        const { products } = this.props;
        const { meal } = this.state;

        let tableTemplate = meal.products.map((product, index) => {
            return (
                <tr key={index}>
                    <td>
                        <select name={`products[${index}].product`} data-index={index} value={meal.products[index].product._id} onChange={this.handleProductChange}>
                            {
                                products.map((product, index) => {
                                    return (
                                        <option key={index} value={product._id}>{product.name}</option>
                                    )
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].amount`} data-index={index} value={meal.products[index].amount} onChange={this.handleAmountChange} />
                    </td>
                    <td>
                        <button type="button" onClick={() => this.handleRemoveProductClick(index)}>Удалить</button>
                    </td>
                    <td>
                        <button type="button" onClick={this.handleAddProductClick}>Добавить новый</button>
                    </td>
                </tr>
            )
        });

        return (
            <form action="#" method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="name">Дата:</label>
                <input type="date" name="date" id="date" value={this.state.meal.date} onChange={this.handleDateChange} />
                <br />
                <label htmlFor="name">Наименование:</label>
                <input type="text" name="name" id="name" value={this.state.meal.name} onChange={this.handleNameChange} />
                <br />
                <label htmlFor="name">Время начала:</label>
                <input type="time" name="startTime" id="startTime" value={this.state.meal.startTime} onChange={this.handleStartTimeChange} />
                <br />
                <label htmlFor="name">Время окончания:</label>
                <input type="time" name="endTime" id="endTime" value={this.state.meal.endTime} onChange={this.handleEndTimeChange} />
                <br />

                <label htmlFor="products">Продукты:</label>
                <button type="button" onClick={this.handleAddProductClick}>Добавить</button>
                <br />

                {meal.products.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <td>Продукт</td>
                                <td>Количество</td>
                                <td colSpan="2">Действие</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableTemplate}                        
                        </tbody>
                    </table>
                )}

                <br />
                <button type="button" onClick={this.handleBackwardClick}>Назад</button>{' '}
                <input type="submit" value="Сохранить" />
            </form>
        )
    }
}

MealForm.defaultProps = {
    meal: {
        products: [],
        // date: '',
        // name: 'Новый прием'
        // startTime: '',
        // endTime: ''
    }
}
