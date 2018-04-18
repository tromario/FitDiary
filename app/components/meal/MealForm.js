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

        this.setState({
            meal: meal
        })
    }

    handleNameChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.name = value;

        this.setState({
            meal: meal
        })
    }

    handleStartTimeChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.startTime = value;

        this.setState({
            meal: meal
        })
    }

    handleEndTimeChange = event => {
        var value = event.target.value;

        const { meal } = this.state;
        meal.endTime = value;

        this.setState({
            meal: meal
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { handleSubmit } = this.props

        // var values = {
        //     date: this.state.meal.date,
        //     name: this.state.meal.name,
        //     startTime: this.state.meal.startTime,
        //     endTime: this.state.meal.endTime
        // }

        handleSubmit(this.state.meal)
    }

    handleBackwardClick = () => {
        const { handleBackward } = this.props;

        handleBackward();
    }

    render() {
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
                <button onClick={this.handleBackwardClick}>Назад</button>{' '}
                <input type="submit" value="Сохранить" />
            </form>
        )
    }
}

MealForm.defaultProps = {
    meal: {
        // date: '',
        // name: '',
        // startTime: '',
        // endTime: ''
    }
}
