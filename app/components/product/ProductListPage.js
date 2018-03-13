import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProductActions from '../../actions/ProductActions'
import * as CategoryActions from '../../actions/CategoryActions'

import Product from './Product'
import AddProduct from './AddProduct'
import SearchPlugin from '../../utils/SearchPlugin'

import { NavLink } from 'react-router-dom'

class ProductListPage extends Component {
  constructor(props) {
    super(props);

    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    const { getProducts } = this.props.productActions
    const { getCategories } = this.props.categoryActions

    getProducts()
    getCategories()
  }

  filterList(text) {
    let filteredList = this.props.products.filter(function(item) {
      return item.name.toLowerCase().search(text.toLowerCase()) !== -1
    });
    this.setState({products: filteredList});
  }

  render() {
    const { addProduct, deleteProduct } = this.props.productActions
    const { products } = this.props.product
    const { categories } = this.props.category

    let tableTemplate = products.map(function(item, index) {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.category ? item.category.name : ''}</td>
          <td>{item.price}</td>
          <td><NavLink to={`/products/${item._id}`}>Подробнее</NavLink></td>
          <td><NavLink to={`/products/${item._id}`}>Изменить</NavLink></td>
          <td><a href="#" onClick={()=>deleteProduct(item._id)}>Удалить</a></td>
        </tr>
      )
    })

    return (
      <div>
        <h2>Продукты</h2>
        <NavLink to={'/products/new'}>Добавить</NavLink>
        <h3>Список продуктов:</h3>
        <SearchPlugin filter={this.filterList} />
        <table>
          <tbody>
            <tr>
              <th>Наименование</th>
              <th>Категория</th>
              <th>Цена</th>
              <th colSpan="2">Действия</th>
            </tr>
            {tableTemplate}
          </tbody>
        </table>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
