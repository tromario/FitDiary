import React, {Component, PropTypes} from "react";
import * as MealHelpers from "../../utils/MealHelpers";
import moment from "moment";

export default class MealForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: this.props.meal
        };
    }

    handleFieldChange = event => {
        let name = event.target.name;
        var value = event.target.value;

        const {meal} = this.state;
        meal[name] = value;

        this.setState({meal});
    };

    handleAddProductClick = () => {
        const {meal} = this.state;
        const {products} = this.props;

        let product = products.length > 0 ? products[0] : "";

        meal.products.push({
            product: product,
            amount: 0
        });
        this.setState({meal});
    };

    handleRemoveProductClick = index => {
        const {meal} = this.state;
        const deleteCountProduct = 1;

        meal.products.splice(index, deleteCountProduct);

        let calcTotalMeal = MealHelpers.calcTotalNutritionalValue(meal);
        this.setState({meal: calcTotalMeal});
    };

    handleProductChange = event => {
        const {meal} = this.state;

        let productId = event.target.value;
        let product = this.props.products.find(product => product._id == productId);
        let name = event.target.name;
        let index = event.target.getAttribute("data-index");
        let amount = meal.products[index].amount;

        let calcMeal = MealHelpers.calcNutritionalValue(meal, product, amount, index);
        this.setState({meal: calcMeal});
    };

    handleAmountChange = event => {
        const {meal} = this.state;

        let amount = event.target.value;
        let index = event.target.getAttribute("data-index");
        let product = meal.products[index].product;

        let calcMeal = MealHelpers.calcNutritionalValue(meal, product, amount, index);
        this.setState({meal: calcMeal});
    };

    handleSubmit = event => {
        event.preventDefault();

        const {handleSubmit} = this.props;
        handleSubmit(this.state.meal);
    };

    handleBackwardClick = () => {
        const {handleBackward} = this.props;
        handleBackward();
    };

    render() {
        const {products} = this.props;
        const {meal} = this.state;

        let tableTemplate = meal.products.map((product, index) => {
            return (
                <tr key={index}>
                    <td>
                        <select name={`products[${index}].product`} data-index={index}
                                value={meal.products[index].product._id} onChange={this.handleProductChange}>
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
                        <input type="text" name={`products[${index}].amount`} data-index={index}
                               value={meal.products[index].amount} onChange={this.handleAmountChange}/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].proteins`} data-index={index}
                               value={meal.products[index].proteins} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].fats`} data-index={index}
                               value={meal.products[index].fats} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].carbohydrates`} data-index={index}
                               value={meal.products[index].carbohydrates} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].cellulose`} data-index={index}
                               value={meal.products[index].cellulose} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].caloricity`} data-index={index}
                               value={meal.products[index].caloricity} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].energy`} data-index={index}
                               value={meal.products[index].energy} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].glycemicIndex`} data-index={index}
                               value={meal.products[index].glycemicIndex} disabled/>
                    </td>
                    <td>
                        <input type="text" name={`products[${index}].insulinIndex`} data-index={index}
                               value={meal.products[index].insulinIndex} disabled/>
                    </td>
                    <td>
                        <button type="button" onClick={() => this.handleRemoveProductClick(index)}>Удалить</button>
                    </td>
                    <td>
                        <button type="button" onClick={this.handleAddProductClick}>Добавить новый</button>
                    </td>
                </tr>
            );
        });

        let date = moment(meal.date).format("YYYY-MM-DD");

        return (
            <form action="#" method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="name">Дата:</label>
                <input type="date" name="date" id="date" value={date} onChange={this.handleFieldChange}/>
                <br/>
                <label htmlFor="name">Наименование:</label>
                <input type="text" name="name" id="name" value={meal.name} onChange={this.handleFieldChange}/>
                <br/>
                <label htmlFor="name">Время начала:</label>
                <input type="time" name="startTime" id="startTime" value={meal.startTime}
                       onChange={this.handleFieldChange}/>
                <br/>
                <label htmlFor="name">Время окончания:</label>
                <input type="time" name="endTime" id="endTime" value={meal.endTime} onChange={this.handleFieldChange}/>
                <br/>

                <label htmlFor="products">Продукты:</label>
                <button type="button" onClick={this.handleAddProductClick}>Добавить</button>
                <br/>

                {meal.products.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <td>Продукт</td>
                                <td>Количество</td>
                                <td>Белки</td>
                                <td>Жиры</td>
                                <td>Углеводы</td>
                                <td>Клетчатка</td>
                                <td>Калорийность</td>
                                <td>Энергетическая ценность</td>
                                <td>Гликемический индекс</td>
                                <td>Инсулиновый индекс</td>
                                <td colSpan="2">Действие</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableTemplate}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Итого</td>
                                <td>{meal.totalAmount}</td>
                                <td>{meal.totalProteins}</td>
                                <td>{meal.totalFats}</td>
                                <td>{meal.totalCarbohydrates}</td>
                                <td>{meal.totalCellulose}</td>
                                <td>{meal.totalCaloricity}</td>
                                <td>{meal.totalEnergy}</td>
                            </tr>
                        </tfoot>
                    </table>
                )}

                <br/>
                <button type="button" onClick={this.handleBackwardClick}>Назад</button>
                {" "}
                <input type="submit" value="Сохранить"/>
            </form>
        );
    }
}

MealForm.defaultProps = {
    meal: {
        products: []
        // date: '',
        // name: 'Новый прием'
        // startTime: '',
        // endTime: ''
    }
};
