import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MealActions from '../../actions/MealActions'
import * as ProductActions from '../../actions/ProductActions'

import MealForm from './MealForm'

class MealPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            meal: {
                products: []
            }
        }
    }

    componentWillMount() {
        const { id } = this.props.match.params
        const { getMeal } = this.props.mealActions

        getMeal(id).then((result) => {
            const { meal } = this.props.meal
            this.setState({ meal })
        }).catch(function (err) {
            console.log(err);
        })
    }

    handleUpdate = values => {
        const { id } = this.props.match.params
        const { updateMeal } = this.props.mealActions
        const { history } = this.context.router

        var data = {
            id: id,
            ...values
        }

        updateMeal(data)
            .then(result => {
                // todo: подумать, как сделать редирект через dispatch
                history.push('/meals');
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleToggleEditClick = () => {
        this.setState({ isEditing: true })
    }

    handleDeleteClick = () => {
        const { id } = this.props.match.params
        const { deleteMeal } = this.props.mealActions

        deleteMeal(id)
    }

    handleBackwardClick = () => {
        const { history } = this.context.router

        history.push('/meals')
    }

    render() {
        const { products } = this.props.product
        const { meal, isEditing } = this.state

        if (isEditing) {
            return (
                <div>
                    <h3>Изменение приема пищи</h3>
                    <MealForm
                        meal={meal}
                        products={products}
                        handleBackward={this.handleBackwardClick}
                        handleSubmit={this.handleUpdate}
                    />

                </div>
            )
        }

        let date = moment(meal.date).locale('ru').format('DD MMMM YYYY');

        return (
            <div>
                <h3>Просмотр приема пищи</h3>
                <p>Дата: {date}</p>
                <p>Наименование: {meal.name}</p>
                <p>Время начала: {meal.startTime}</p>
                <p>Время окончания: {meal.endTime}</p>
                
                <p>Продукты:</p>
                {
                    meal.products.map((product, index) => {
                        return(
                            <div key={index}>
                                {product.product.name} - {product.amount} г.
                            </div>
                        )
                    })
                }

                <button onClick={this.handleBackwardClick}>Назад</button>{' '}
                <button onClick={this.handleToggleEditClick}>Изменить</button>{' '}
                <button onClick={this.handleDeleteClick}>Удалить</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MealPage)
