import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MealActions from '../../actions/MealActions'

import MealForm from './MealForm'

class NewMealPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleCreate = values => {
        const { createMeal } = this.props.mealActions
        const { history } = this.context.router

        var data = {
            date: values.date,
            name: values.name,
            startTime: values.startTime,
            endTime: values.endTime
        }

        createMeal(data)

        // todo: подумать, как сделать редирект через dispatch
        history.push('/meals')
    }

    handleBackwardClick = () => {
        const { history } = this.context.router

        history.push('/meals')
    }

    render() {
        return (
            <div>
                <h3>Добавление приема пищи</h3>
                <MealForm
                    handleBackward={this.handleBackwardClick}
                    handleSubmit={this.handleCreate}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewMealPage)
