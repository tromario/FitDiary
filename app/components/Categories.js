import React, { Component } from 'react'

class Categories extends Component {
  render() {
    let tableTemplate = items.map(function(item, index) {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td><a href="#">Изменить</a></td>
          <td><a href="#">Удалить</a></td>
        </tr>
      )
    })

    return(
      <div>
        <h2>Категории</h2>
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
