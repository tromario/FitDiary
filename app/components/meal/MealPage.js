import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MealActions from '../../actions/MealActions'

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
            date: values.date,
            name: values.name,
            startTime: values.startTime,
            endTime: values.endTime
        }

        updateMeal(data)

        // todo: подумать, как сделать редирект через dispatch
        history.push('/meals')
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
        const { meal } = this.props.meal
        const { isEditing } = this.state

        if (isEditing) {
            return (
                <div>
                    <h3>Изменение приема пищи</h3>
                    <MealForm
                        meal={meal}
                        handleBackward={this.handleBackwardClick}
                        handleSubmit={this.handleUpdate}
                    />

                </div>
            )
        }

        return (
            <div>
                <h3>Просмотр приема пищи</h3>
                <p>Дата: {this.state.meal.date}</p>
                <p>Наименование: {this.state.meal.name}</p>
                <p>Время начала: {this.state.meal.startTime}</p>
                <p>Время окончания: {this.state.meal.endTime}</p>
                
                <p>Продукты:</p>
                {
                    this.state.meal.products.map(function(product) {
                        return(
                            <div>
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
        meal: state.meal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mealActions: bindActionCreators(MealActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealPage)
