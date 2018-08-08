import React, {Component} from "react";
import moment from "moment";

// TODO: Добавить возможность сохранения фильтра

/** Фильтр для приемов пищи */
export default class MealsFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {date: new Date()}
        };
    }

    handleFilterDateChange = event => {
        var value = event.target.value;

        const {filter} = this.state;
        filter.date = value;

        this.setState({filter});
    };

    handleApplyClick = () => {
        const {filter} = this.state;
        this.props.handleApply(filter);
    };

    handleClearClick = () => {
        this.props.handleClear();
    };

    render() {
        const {filter} = this.state;
        let date = moment(filter.date).format("YYYY-MM-DD");

        return (
            <div>
                <label htmlFor="">Фильтр по дате:</label> {" "}
                <input type="date" name="filter[date]" value={date} onChange={this.handleFilterDateChange}/>
                {" "}
                <button type="button" onClick={this.handleApplyClick}>Применить</button>
                {" "}
                <button type="button" onClick={this.handleClearClick}>Очистить</button>

                <br/>
                <br/>
            </div>
        )
    }
}