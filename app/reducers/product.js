import * as types from '../constants/Product'

const initialState = {
  products: [],
  product: null
}

export default function product(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [
          ...state.products,
          action.payload
        ]
      }

    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload }

    case types.GET_PRODUCT_SUCCESS:
      return { ...state, product: action.payload }

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product => {
          if (product._id === action.payload._id) return action.payload
          return product
        })
      }

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload._id)
      }

    default:
      return state
  }
}
