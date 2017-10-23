import React from 'react';

export default class Product extends React.Component {
  render() {
    return (
      <li>{this.props.name}</li>
    )
  }
}
