import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as MealActions from '../../actions/MealActions'
import * as ProductActions from '../../actions/ProductActions'

class MealListPage extends Component {
    componentWillMount() {
        const { getMeals } = this.props.mealActions
        const { getProducts } = this.props.productActions

        getMeals()
        getProducts();
    }

    render() {
        const { meals } = this.props.meal
        const { getMeals, deleteMeal, updateMeal } = this.props.mealActions

        return (
            <div>
                <h2>Приемы пищи</h2>
                <NavLink to={'/meals/new'}>Добавить прием пищи</NavLink>
                <br />
                <NavLink to={'/meals/new'}>Добавить продукт в прием пищи</NavLink>
                <br />
                <br />
                
                {
                    meals.map((meal, index) => {
                        return (
                            <div key={index}>
                                {/* <span>{meal.name} | {meal.startTime} - {meal.endTime}</span> */}
                                <table style={{borderCollapse: 'separate', borderSpacing: '5px'}}>
                                    <thead>
                                        <tr>
                                            <td>{meal.name}</td>
                                            <td>{meal.startTime} - {meal.endTime}</td>
                                            <td><NavLink to={`/meals/${meal._id}`}>Изменить</NavLink></td>
                                            <td><a href="#" onClick={()=>deleteMeal(meal._id)}>Удалить</a></td>
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
                                            <th>Калории</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            meal.products.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.product.name}</td>
                                                        <td>{product.amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>Итого</td>
                                            <td>Знач</td>
                                            <td>Знач</td>
                                            <td>Знач</td>
                                            <td>Знач</td>
                                            <td>Знач</td>
                                            <td>Знач</td>
                                        </tr>
                                    </tfoot>
                                </table>                                
                                <br />
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
        product: state.product
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mealActions: bindActionCreators(MealActions, dispatch),
        productActions: bindActionCreators(ProductActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListPage)
