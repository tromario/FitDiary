import React, {Component, PropTypes} from "react";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as MealActions from "../../actions/MealActions";
import * as ProductActions from "../../actions/ProductActions";

import MealForm from "./MealForm";

class NewMealPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    handleCreate = values => {
        const {createMeal} = this.props.mealActions;
        const {history} = this.context.router;

        createMeal(values)
            .then(result => {
                // todo: подумать, как сделать редирект через dispatch
                history.push("/meals");
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleBackwardClick = () => {
        const {history} = this.context.router;

        history.push("/meals");
    };

    render() {
        const {products} = this.props.product;

        return (
            <div>
                <h3>Добавление приема пищи</h3>
                <MealForm
                    products={products}
                    handleBackward={this.handleBackwardClick}
                    handleSubmit={this.handleCreate}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        meal: state.meal,
        product: state.product
    };
}

function mapDispatchToProps(dispatch) {
    return {
        mealActions: bindActionCreators(MealActions, dispatch),
        productActions: bindActionCreators(ProductActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMealPage)
