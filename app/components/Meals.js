import React, { Component } from 'react'
import ProductAPI from '../api/ProductAPI'
import MealsAPI from '../api/MealsAPI'

export default class Meals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: ProductAPI.all(),
      showFormAddProduct: false,
      meals: MealsAPI.all()
    }

    this.addProduct = this.addProduct.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  addProduct() {
    this.setState({showFormAddProduct: !this.state.showFormAddProduct})
  }

  deleteProduct(mealNumber, productIndex) {
    newMeal = MealsAPI.delete(mealNumber, productIndex)
    this.setState({meals: newMeal})
  }

  handleSubmit(e) {
    e.preventDefault()

    let mealNumber = this.refs.mealNumber.value
    let product = this.refs.product.value
    let newMeal = MealsAPI.add(mealNumber, product)
    this.setState({meals: newMeal})
  }

  render() {
    let displayFormAddProduct = this.state.showFormAddProduct === true ? 'block' : 'none';

    let tableTemplate = MealsAPI.all().map(function(item, mealIndex) {
      return(
        item.products.map(function(product, productIndex) {
          return(
            <tr key={item.number + productIndex + mealIndex}>
              <td>{item.number}</td>
              <td>{product}</td>
              <td><a href="#">Удалить</a></td>
            </tr>
          )
        })
      )
    })

    return(
      <div>
        <h1>Приемы пищи</h1>
        <table>
          <tbody>
            <tr key={0}>
              <th>Номер</th>
              <th>Продукт</th>
            </tr>
            {tableTemplate}
          </tbody>
        </table>

        <input type="button" name="" id="" value="Добавить продукт" onClick={this.addProduct} />
        <form style={{display: displayFormAddProduct}} onSubmit={this.handleSubmit}>
          <label htmlFor="numberMeal">Номер приема</label>
          <input type="text" name="" id="numberMeal" ref="mealNumber" />
          <label htmlFor="product">Продукт</label>
          <select name="" ref="product">
            {
              this.state.products.map(function(product) {
                return(
                  <option key={product.id}>{product.name}</option>
                )
              })
            }
          </select>
          <input type="submit" name="" id="" value="Добавить" />
        </form>

        <br />
        <input type="button" name="" id="" value="Добавить прием пищи" />
      </div>
    )
  }
}
