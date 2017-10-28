import React from 'react'
import Product from './Product'
import AddProduct from './AddProduct'
import SearchPlugin from '../../utils/SearchPlugin'

// Переименовать в ProductList
export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    this.props.getProducts()
  }

  filterList(text) {
    let filteredList = this.props.items.filter(function(item) {
      return item.name.toLowerCase().search(text.toLowerCase()) !== -1
    });
    this.setState({items: filteredList});
  }

  render() {
    const { items, addProduct, deleteProduct } = this.props

    let tableTemplate = items.map(function(item, index) {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td><a href="#">Изменить</a></td>
          <td><a href="#" onClick={()=>deleteProduct(item.id)}>Удалить</a></td>
        </tr>
      )
    })

    return (
      <div>
        <h2>Продукты</h2>
        <AddProduct addProduct={addProduct} />
        <h3>Список продуктов:</h3>
        <SearchPlugin filter={this.filterList} />
        <table>
          <tbody>
            <tr>
              <th>Наименование</th>
              <th>Цена</th>
              <th colSpan="2">Действия</th>
            </tr>
            {tableTemplate}
          </tbody>
        </table>
      </div>
    );
  }
}
