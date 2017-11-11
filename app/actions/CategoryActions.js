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

import CategoryAPI from '../api/CategoryAPI'

function createCategoryRequest() {
  return {
    type: CREATE_CATEGORY_REQUEST
  }
}

function createCategorySuccess(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category
  }
}

function getCategoriesRequest() {
  return {
    type: GET_CATEGORIES_REQUEST
  }
}

function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}

function getCategoryRequest() {
  return {
    type: GET_CATEGORY_REQUEST
  }
}

function getCategorySuccess(category) {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: category
  }
}

function updateCategoryRequest() {
  return {
    type: UPDATE_CATEGORY_REQUEST
  }
}

function updateCategorySuccess(category) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category
  }
}

function deleteCategoryRequest() {
  return {
    type: DELETE_CATEGORY_REQUEST
  }
}

function deleteCategorySuccess(category) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
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
