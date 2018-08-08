import React, {Component, PropTypes} from "react";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CategoryActions from "../../actions/CategoryActions";

import CategoryForm from "./CategoryForm";

class NewCategoryPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    handleCreate = values => {
        const {createCategory} = this.props.categoryActions;
        const {history} = this.context.router;

        var data = {
            name: values.name
        };

        createCategory(data);

        // todo: подумать, как сделать редирект через dispatch
        history.push("/categories");
    };

    handleBackwardClick = () => {
        const {history} = this.context.router;

        history.push("/categories");
    };

    render() {
        return (
            <div>
                <h3>Добавление категории</h3>
                <CategoryForm
                    handleBackward={this.handleBackwardClick}
                    handleSubmit={this.handleCreate}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        category: state.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoryActions: bindActionCreators(CategoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryPage)
