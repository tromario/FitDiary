import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Router, Route } from 'react-router-dom'

import Home from '../components/Home'
import ProductListPage from './ProductListPage'
import Meals from '../components/Meals'
import Profile from '../components/Profile'

export default class RouteList extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={ProductListPage} />
        <Route path="/categories" components={Categories} />
        <Route path="/meals" component={Meals} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}
