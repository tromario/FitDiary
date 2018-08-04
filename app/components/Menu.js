import React, { Component } from 'react'
import { NavLink, Route, Router } from 'react-router-dom'

export default class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink exac to="/" activeClassName="active">Главная</NavLink></li>
          <li><NavLink exac to="/products" activeClassName="active">Продукты</NavLink></li>
          <li><NavLink exac to="/categories" activeClassName="active">Категории</NavLink></li>
          <li><NavLink exac to="/meals" activeClassName="active">Приемы пищи</NavLink></li>
          <li><NavLink exac to="/profile" activeClassName="active">Личный профиль</NavLink></li>
        </ul>
      </nav>
    )
  }
}
