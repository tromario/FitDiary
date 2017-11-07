import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class CategoryList extends Component {
  componentWillMount() {
    const { getCategories } = this.props.categoryActions

    getCategories()
  }

  render() {
    const { categories } = this.props.category
    const { getCategories, deleteCategory, updateCategory } = this.props.categoryActions

    let tableTemplate = categories.map(function(category, index) {
      return(
        <tr key={index}>
          <td>{category.name}</td>
          <td><NavLink to={`/categories/${category._id}`}>Изменить</NavLink></td>
          <td><a href="#" onClick={()=>deleteCategory(category._id)}>Удалить</a></td>
        </tr>
      )
    })

    return(
      <div>
        <h2>Категории</h2>
        <NavLink to={'/categories/new'}>Добавить</NavLink>
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
