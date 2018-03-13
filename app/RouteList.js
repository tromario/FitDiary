import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom'

import Home from './components/Home'
import Meals from './components/Meals'
import Profile from './components/Profile'

import ProductListPage from './components/product/ProductListPage'
import ProductPage from './components/product/ProductPage'
import NewProductPage from './components/product/NewProductPage'

import CategoryListPage from './components/category/CategoryListPage'
import CategoryPage from './components/category/CategoryPage'
import NewCategoryPage from './components/category/NewCategoryPage'

export default class RouteList extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/products" component={ProductListPage} />
          <Route path="/products/new" component={NewProductPage} />
          <Route path="/products/:id" component={ProductPage} />

          <Route exact path="/categories" component={CategoryListPage} />
          <Route path="/categories/new" component={NewCategoryPage} />
          <Route path="/categories/:id" component={CategoryPage} />

          <Route path="/meals" component={Meals} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    )
  }
}
