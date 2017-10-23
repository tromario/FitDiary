import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,

  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,

  DELETE_PRODUCT
} from '../constants/Product'

import ProductAPI from '../api/ProductAPI'

// const initialState = ProductAPI.all() || {}
const initialState = {
  products: []
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { ...state }

    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload }

    case ADD_PRODUCT_REQUEST:
      return { ...state }

    case ADD_PRODUCT_SUCCESS:
      // const newId = state.products[state.products.length - 1].id + 1
      // return {
      //   products: [
      //     ...state.products,
      //     { id: newId, name: action.payload }
      //   ]
      // }
      // return { ...state, products: action.payload }

      return {
        products: [
          ...state.products,
          action.payload
        ]
      }

    case DELETE_PRODUCT:
      return { ...state, products: state.products.filter(product => product.id !== action.payload) }

    default:
      return state;
  }
}
