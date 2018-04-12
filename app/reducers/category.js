import * as types from '../constants/Category'
import * as dataTypeHelpers from '../helpers/dataType'

const initialState = {
  categories: [],
  category: null
}

export default function category(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CATEGORY_SUCCESS:
      // TODO: Не получится создать более одной категории
      return {
        ...state,
        categories: [
          ...state.categories,
          action.payload
        ]
      }

    case types.GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload }

    case types.GET_CATEGORY_SUCCESS:
      return { ...state, category: action.payload }

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (dataTypeHelpers.isUndefined(category._id) || dataTypeHelpers.isUndefined(action.payload._id)) return category;
          if (category._id === action.payload._id) return action.payload
          return category
        })
      }

    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(category => {
          if (dataTypeHelpers.isUndefined(category._id) || dataTypeHelpers.isUndefined(action.payload._id)) return true;
          return category._id !== action.payload._id;
        })
      }

    default:
      return state
  }
}
