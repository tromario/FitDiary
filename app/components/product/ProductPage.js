import React, { Component, PropTypes } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../../actions/ProductActions'
import * as CategoryActions from '../../actions/CategoryActions'

import ProductForm from './ProductForm'

class ProductPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            // product: {
            //     category: {
            //         name: ''
            //     }
            // }
        }
    }

    componentWillMount() {
        const { id } = this.props.match.params
        const { getProduct } = this.props.productActions

        getProduct(id).then((result) => {
            const { product } = this.props.product
            this.setState({ product: product })
        }).catch(function (err) {
            console.log(err);
        })
    }

    handleUpdate = values => {
        const { id } = this.props.match.params
        const { updateProduct } = this.props.productActions
        const { history } = this.context.router

        var data = {
            id: id,
            ...values 
        }

        updateProduct(data)

        // todo: подумать, как сделать редирект через dispatch
        history.push('/products')
    }

    handleToggleEditClick = () => {
        this.setState({ isEditing: true })
    }

    handleDeleteClick = () => {
        const { id } = this.props.match.params
        const { deleteProduct } = this.props.productActions

        deleteProduct(id)
    }

    handleBackwardClick = () => {
        const { history } = this.context.router

        history.push('/products')
    }

    render() {
        // const { product } = this.props.product
        const { categories } = this.props.category
        const { isEditing, product } = this.state

        if (!product) return <div>loading</div>

        if (isEditing) {
            return (
                <div>
                    <h3>Изменение категории</h3>
                    <ProductForm
                        product={product}
                        categories={categories}
                        handleBackward={this.handleBackwardClick}
                        handleSubmit={this.handleUpdate}
                    />
                </div>
            )
        }

        return (
            <div>
                <h3>Просмотр категории</h3>
                <p>Наименование: {this.state.product.name}</p>
                <p>Пищевая ценность для веса: {this.state.product.portionSize}</p>
                <p>Белки: {this.state.product.proteins}</p>
                <p>Жиры: {this.state.product.fats}</p>
                <p>Углеводы: {this.state.product.carbohydrates}</p>
                <p>Клетчатка: {this.state.product.cellulose}</p>
                <p>Калорийность: {this.state.product.caloricity}</p>
                <p>Энергетическая ценность: {this.state.product.energy}</p>
                <p>Гликемический индекс: {this.state.product.glycemicIndex}</p>
                <p>Инсулиновый индекс: {this.state.product.insulinIndex}</p>
                <p>Цена: {this.state.product.price}</p>

                {/* TODO: Категория может быть пустой */}
                <p>Категория: {this.state.product.category.name}</p>

                <button onClick={this.handleBackwardClick}>Назад</button>{' '}
                <button onClick={this.handleToggleEditClick}>Изменить</button>{' '}
                <button onClick={this.handleDeleteClick}>Удалить</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
