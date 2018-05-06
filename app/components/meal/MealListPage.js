import React, { Component } from 'react'
import MealsFilter from './MealsFilter'
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import * as MealActions from '../../actions/MealActions'
import * as ProductActions from '../../actions/ProductActions'

class MealListPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { getMeals } = this.props.mealActions
        const { getProducts } = this.props.productActions

        getMeals()
        getProducts();
    }    

    handleApplyFilter = filter => {
        this.props.mealActions.getMeals(filter);
    }

    handleClearFilter = () => {
        this.props.mealActions.getMeals();
    }

    render() {
        const { meals } = this.props.meal
        const { getMeals, deleteMeal, updateMeal } = this.props.mealActions

        // TODO: Доработать по завершению задачи I-7
        let totalDayAmount = 0;
        let totalDayProtein = 0;
        let totalDayFat = 0;
        let totalDayCarbohydrate = 0;
        let totalDayCellulose = 0;
        let totalDayCalorie = 0;
        let totalDayEnergy = 0;

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
                    meals.map((meal, index) => {
                        let totalMealAmount = 0;
                        let totalMealProtein = 0;
                        let totalMealFat = 0;
                        let totalMealCarbohydrate = 0;
                        let totalMealCellulose = 0;
                        let totalMealCalorie = 0;
                        let totalMealEnergy = 0;

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
                                            <th>Калорийность</th>
                                            <th>Энергетическая ценность</th>
                                            <th>Гликемический индекс</th>
                                            <th>Инсулиновый индекс</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            meal.products.map((product, index) => {
                                                totalMealAmount += product.amount;
                                                totalMealProtein += product.proteins;
                                                totalMealFat += product.fats;
                                                totalMealCarbohydrate += product.carbohydrates;
                                                totalMealCellulose += product.cellulose;
                                                totalMealCalorie += product.caloricity;
                                                totalMealEnergy += product.energy;

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
                                                        <td>{product.glycemicIndex}</td>
                                                        <td>{product.insulinIndex}</td>
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
                                {
                                    (() => {
                                        // TODO: Доработать по завершению задачи I-7
                                        totalDayAmount += totalMealAmount;
                                        totalDayProtein += totalMealProtein;
                                        totalDayFat += totalMealFat;
                                        totalDayCarbohydrate += totalMealCarbohydrate;
                                        totalDayCellulose += totalMealCellulose;
                                        totalDayCalorie += totalMealCalorie;
                                        totalDayEnergy += totalMealEnergy;
                                    })()
                                }
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
                            <td>{totalDayAmount}</td>
                            <td>{totalDayProtein}</td>
                            <td>{totalDayFat}</td>
                            <td>{totalDayCarbohydrate}</td>
                            <td>{totalDayCellulose}</td>
                            <td>{totalDayCalorie}</td>
                            <td>{totalDayEnergy}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
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
