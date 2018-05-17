import React, { Component } from 'react'
import MealsFilter from './MealsFilter'
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as MealActions from '../../actions/MealActions'
import * as ProductActions from '../../actions/ProductActions'
import * as HistoryActions from '../../actions/HistoryActions'

class MealListPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { getHistories } = this.props.historyActions
        const { getProducts } = this.props.productActions

        getHistories();
        getProducts();
    }    

    deleteMeal = id => {
        this.props.mealActions.deleteMeal(id)
            .then(response => {
                // TODO: Подумать о манипуляции с редьюсером, взамен выполнению запроса
                this.props.historyActions.getHistories();
            })
            .catch(error => {
                console.log('action "deleteMeal": ', error);
            });
    }

    handleApplyFilter = filter => {
        this.props.historyActions.getHistories(filter);
    }

    handleClearFilter = () => {
        this.props.historyActions.getHistories();
    }

    render() {
        const { meals } = this.props.meal;
        const { histories } = this.props.history;

        return (
            <div>
                <h2>Приемы пищи</h2>

                <MealsFilter 
                    handleApply={this.handleApplyFilter}
                    handleClear={this.handleClearFilter} />

                <NavLink to={'/meals/new'}>Добавить прием пищи</NavLink>
                <br />
                <NavLink to={'/meals/new'}>Добавить продукт в прием пищи</NavLink>
                <br />
                <br />

                {
                    histories.map((history, index) => {
                        return (
                            <div key={index}>
                                <p>Прием пищи на {moment(history.date).locale('ru').format('DD MMMM YYYY')}</p>
                                <p>Количество приемов: {history.meals.length}</p>

                                {
                                    history.meals.map((meal, index) => {
                                        return (
                                            <div key={index}>
                                                {/* <span>{meal.name} | {meal.startTime} - {meal.endTime}</span> */}
                                                <table style={{borderCollapse: 'separate', borderSpacing: '5px'}}>
                                                    <thead>
                                                        <tr>
                                                            <td>{meal.name}</td>
                                                            <td>{meal.startTime} - {meal.endTime}</td>
                                                            <td><NavLink to={`/meals/${meal._id}`}>Изменить</NavLink></td>
                                                            <td><a href="#" onClick={()=>this.deleteMeal(meal._id)}>Удалить</a></td>
                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th>Продукты</th>
                                                            <th>Количество</th>
                                                            <th>Белки</th>
                                                            <th>Жиры</th>
                                                            <th>Углеводы</th>
                                                            <th>Клетчатка</th>
                                                            <th>Калорийность</th>
                                                            <th>Энергетическая ценность</th>
                                                            <th>Гликемический индекс</th>
                                                            <th>Инсулиновый индекс</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            meal.products.map((product, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{product.product.name}</td>
                                                                        <td>{product.amount}</td>
                                                                        <td>{product.proteins}</td>
                                                                        <td>{product.fats}</td>
                                                                        <td>{product.carbohydrates}</td>
                                                                        <td>{product.cellulose}</td>
                                                                        <td>{product.caloricity}</td>
                                                                        <td>{product.energy}</td>
                                                                        <td>{product.product.glycemicIndex}</td>
                                                                        <td>{product.product.insulinIndex}</td>
                                                                    </tr>
                                                                )
                                                            })                                            
                                                        }
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
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>                                
                                                <br />                                                
                                            </div>
                                        )
                                    })                    
                                }

                                <table style={{borderCollapse: 'separate', borderSpacing: '5px'}}>
                                    <thead>
                                        <tr>
                                            <th>Продукты</th>
                                            <th>Количество</th>
                                            <th>Белки</th>
                                            <th>Жиры</th>
                                            <th>Углеводы</th>
                                            <th>Клетчатка</th>
                                            <th>Калорийность</th>
                                            <th>Энергетическая ценность</th>
                                            <th>Гликемический индекс</th>
                                            <th>Инсулиновый индекс</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Итого</td>
                                            {/* Исправить поля на ед. число */}
                                            <td>{history.totalAmount}</td>
                                            <td>{history.totalProteins}</td>
                                            <td>{history.totalFats}</td>
                                            <td>{history.totalCarbohydrate}</td>
                                            <td>{history.totalCellulose}</td>
                                            <td>{history.totalCaloricity}</td>
                                            <td>{history.totalEnergy}</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        meal: state.meal,
        product: state.product,
        history: state.history
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mealActions: bindActionCreators(MealActions, dispatch),
        productActions: bindActionCreators(ProductActions, dispatch),
        historyActions: bindActionCreators(HistoryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListPage)
