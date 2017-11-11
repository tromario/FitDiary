import * as types from '../constants/Category'

const initialState = {
  categories: [],
  category: null
}

export default function category(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CATEGORY_REQUEST:
      return {
        categories: [
          ...state.categories,
          action.payload
        ]
      }

    case types.GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload }

    case types.GET_CATEGORY_SUCCESS:
      return { ...state, category: action.payload}

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category._id === action.payload._id) return action.payload
          return category
        })
      }

    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload._id)
      }

    default:
      return state
  }
}
