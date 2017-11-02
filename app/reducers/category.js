import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,

  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS
} from '../constants/Category'

const initialState = {
  categories: []
}

export default function category(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload }

    case ADD_CATEGORY_SUCCESS:
      return {
        categories: [
          ...state.categories,
          action.payload
        ]
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
