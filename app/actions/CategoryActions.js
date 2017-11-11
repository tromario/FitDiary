import * as types from '../constants/Category'
import CategoryAPI from '../api/CategoryAPI'

function createCategoryRequest() {
  return {
    type: types.CREATE_CATEGORY_REQUEST
  }
}

function createCategorySuccess(category) {
  return {
    type: types.CREATE_CATEGORY_SUCCESS,
    payload: category
  }
}

function getCategoriesRequest() {
  return {
    type: types.GET_CATEGORIES_REQUEST
  }
}

function getCategoriesSuccess(categories) {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}

function getCategoryRequest() {
  return {
    type: types.GET_CATEGORY_REQUEST
  }
}

function getCategorySuccess(category) {
  return {
    type: types.GET_CATEGORY_SUCCESS,
    payload: category
  }
}

function updateCategoryRequest() {
  return {
    type: types.UPDATE_CATEGORY_REQUEST
  }
}

function updateCategorySuccess(category) {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload: category
  }
}

function deleteCategoryRequest() {
  return {
    type: types.DELETE_CATEGORY_REQUEST
  }
}

function deleteCategorySuccess(category) {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: category
  }
}


export function createCategory(category) {
  return (dispatch) => {
    dispatch(createCategoryRequest())

    CategoryAPI.createCategory(category).then(category => {
      dispatch(createCategorySuccess(category))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function getCategories() {
  return (dispatch) => {
    dispatch(getCategoriesRequest())

    CategoryAPI.getCategories().then(categories => {
      dispatch(getCategoriesSuccess(categories))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function getCategory(id, callback) {
  return (dispatch) => {
    dispatch(getCategoryRequest())

    CategoryAPI.getCategory(id).then(category => {
      dispatch(getCategorySuccess(category))
      callback()
    }).catch(error => {
      console.log(error)
    })
  }
}

export function updateCategory(category) {
  return (dispatch) => {
    dispatch(updateCategoryRequest())

    CategoryAPI.updateCategory(category).then(category => {
      dispatch(updateCategorySuccess(category))
    }).catch(error => {
      console.log(error)
    })
  }
}

export function deleteCategory(id) {
  return (dispatch) => {
    dispatch(deleteCategoryRequest())

    CategoryAPI.deleteCategory(id).then(category => {
      dispatch(deleteCategorySuccess(category))
    }).catch(error => {
      console.log(error)
    })
  }
}
