import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import AddCategory from './AddCategory'

export default class CategoryList extends Component {
  componentWillMount() {
    this.props.getCategories()
  }

  render() {
    const { items, addCategory, deleteCategory, updateCategory } = this.props

    // updateCategory(data)

    let tableTemplate = items.map(function(item, index) {
      return(
        <tr key={index}>
          <td>{item.name}</td>
          <td><NavLink to={`/categories/${item._id}`}>Изменить</NavLink></td>
          <td><a href="#" onClick={()=>deleteCategory(item._id)}>Удалить</a></td>
        </tr>
      )
    })

    return(
      <div>
        <h2>Категории</h2>
        <AddCategory addCategory={addCategory} />
        <h3>Список категорий:</h3>
        <table>
          <tbody>
            <tr>
              <th>Наименование</th>
              <th colSpan="2">Действия</th>
            </tr>
            {tableTemplate}
          </tbody>
        </table>
      </div>
    )
  }
}
