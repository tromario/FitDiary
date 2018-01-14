import React, { Component } from 'react'
import Menu from './Menu'
import RouteList from '../RouteList'

export default class App extends Component {
  render() {
    return(
      <div>
        <Menu />
        <RouteList />
      </div>
    )
  }
}
