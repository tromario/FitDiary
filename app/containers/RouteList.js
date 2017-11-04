import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Router, Route } from 'react-router-dom'

import Home from '../components/Home'
import ProductListPage from './ProductListPage'
import CategoryListPage from './CategoryListPage'
import Meals from '../components/Meals'
import Profile from '../components/Profile'

import CategoryPage from './CategoryPage'

export default class RouteList extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={ProductListPage} />
        <Route exact path="/categories" component={CategoryListPage} />
        <Route path="/categories/:id" component={CategoryPage} />
        <Route path="/meals" component={Meals} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}
