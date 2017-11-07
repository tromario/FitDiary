import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom'

import Home from '../components/Home'
import ProductListPage from './product/ProductListPage'
import CategoryListPage from './category/CategoryListPage'
import Meals from '../components/Meals'
import Profile from '../components/Profile'

import CategoryPage from './category/CategoryPage'
import NewCategoryPage from './category/NewCategoryPage'

export default class RouteList extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={ProductListPage} />

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
