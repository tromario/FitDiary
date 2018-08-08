import React from "react";

export default class SearchPlugin extends React.Component {
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e) {
        let text = e.target.value.trim();
        this.props.filter(text);
    }

    render() {
        return (
            <input type="search" name="search" placeholder="Поиск продуктов" onChange={this.onTextChanged}/>
        )
    }
}
