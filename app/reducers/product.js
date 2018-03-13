import * as types from '../constants/Product'

const initialState = {
  products: [],
  product: null
}

export default function product(state = initialState, action) {
  // switch (action.type) {
  //   case GET_PRODUCTS_REQUEST:
  //     return { ...state }

  //   case GET_PRODUCTS_SUCCESS:
  //     return { ...state, products: action.payload }

  //   case ADD_PRODUCT_REQUEST:
  //     return { ...state }

  //   case ADD_PRODUCT_SUCCESS:
  //     return {
  //       products: [
  //         ...state.products,
  //         action.payload
  //       ]
  //     }

  //   case DELETE_PRODUCT:
  //     return { ...state, products: state.products.filter(product => product.id !== action.payload) }

  //   default:
  //     return state;
  // }

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
