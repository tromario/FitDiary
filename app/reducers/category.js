import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,

  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
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

    default:
      return state
  }
}
