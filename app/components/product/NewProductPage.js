import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../../actions/ProductActions'
import * as CategoryActions from '../../actions/CategoryActions'

import ProductForm from './ProductForm'

class NewProductPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    handleCreate = values => {
        const { createProduct } = this.props.productActions
        const { history } = this.context.router

        var data = {
            name: values.name,
            price: values.price,
            category: values.category
        }

        createProduct(values)

        // todo: подумать, как сделать редирект через dispatch
        history.push('/products')
    }

    handleBackwardClick = () => {
        const { history } = this.context.router

        history.push('/products')
    }

    render() {
        const { categories } = this.props.category

        return (
            <div>
                <h3>Добавление категории</h3>
                <ProductForm
                    categories={categories}
                    handleBackward={this.handleBackwardClick}
                    handleSubmit={this.handleCreate}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        product: state.product,
        category: state.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productActions: bindActionCreators(ProductActions, dispatch),
        categoryActions: bindActionCreators(CategoryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductPage)
