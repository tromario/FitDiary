import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,

  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,

  DELETE_PRODUCT
} from '../constants/Product'

import axios from 'axios'

const version = '/api/v1'

export function getProducts() {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_REQUEST
    })

    fetch(version + '/products', { method: 'get', contentType: 'application/json' })
      .then(res => res.json())
      .then(products => dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: products
      }))

    // return fetchGet('/api/products').then(([response, json]) => {
    //   if (response.status === 200) {
    //     dispatch({
    //       type: GET_PRODUCTS_SUCCESS,
    //       payload: json
    //     })
    //   }
    // })

    // setTimeout(() => {
    //   dispatch({
    //     type: GET_PRODUCTS_SUCCESS,
    //     payload: [
    //       { id: 1, name: 'Овсянка' },
    //       { id: 2, name: 'Рис' },
    //       { id: 3, name: 'Молоко' }
    //     ]
    //   })
    // }, 1000)

    // $.ajax({
    //   url: '/api/products',
    //   type: 'get',
    //   contentType: 'application/json',
    //   success: function(products) {
    //     dispatch({
    //       type: GET_PRODUCTS_SUCCESS,
    //       payload: products
    //     })
    //   }
    // })
  }
}

export function addProduct(product) {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_REQUEST
    })

    axios.post(version + '/products', {
      data: product
    })
    .then(product => dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: product.data
    }))
  }

  // return {
  //   type: ADD_PRODUCT,
  //   payload: name
  // }
}

export function deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    payload: id
  }
}
