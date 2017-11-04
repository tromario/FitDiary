import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,

  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,

  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,

  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS
} from '../constants/Category'

import axios from 'axios'

export function getCategories() {
  return (dispatch) => {
    dispatch({
      type: GET_CATEGORIES_REQUEST
    })

    fetch('/api/categories', { method: 'get', contentType: 'application/json' })
      .then(res => res.json())
      .then(categories => dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: categories
      }))
  }
}

export function getCategory(id, callback) {
  return (dispatch) => {
    dispatch({
      type: GET_CATEGORY_REQUEST
    })

    axios.get('/api/categories/' + id)
    .then(response => {
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: response.data
      })
      callback()
    })
  }
}

export function addCategory(category) {
  return (dispatch) => {
    dispatch({
      type: ADD_CATEGORY_REQUEST
    })

    axios.post('/api/categories', {
      data: category
    })
    .then(category => dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: category.data
    }))
  }
}

export function deleteCategory(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY_REQUEST
    })

    axios.delete('/api/categories/' + id)
    .then(response => dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: response.data
    }))

    // axios.delete('/api/categories', {
    //   params: { id: id }
    // })
    // .then(response => dispatch({
    //   type: DELETE_CATEGORY_SUCCESS,
    //   payload: response.data
    // }))
  }
}

export function updateCategory(category) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CATEGORY_REQUEST
    })

    axios.put('/api/categories/' + category.id, {
      data: category
    })
    .then(response => dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: response.data
    }))
  }
}
