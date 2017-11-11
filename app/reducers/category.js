import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,

  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,

  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS
} from '../constants/Category'

const initialState = {
  categories: [],
  category: null
}

export default function category(state = initialState, action) {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        categories: [
          ...state.categories,
          action.payload
        ]
      }

    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload }

    case GET_CATEGORY_SUCCESS:
      return { ...state, category: action.payload}

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category._id === action.payload._id) return action.payload
          return category
        })
      }

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload._id)
      }

    default:
      return state
  }
}
