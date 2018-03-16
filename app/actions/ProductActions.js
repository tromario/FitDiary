import * as types from '../constants/Product'
import ProductAPI from '../api/v1/ProductAPI'
import Promise from 'bluebird'

export function createProduct(product) {
  return (dispatch) => {
    dispatch(createProductRequest())

    ProductAPI.createProduct(product).then(product => {
      dispatch(createProductSuccess(product))
    }).catch(error => {
      console.log(error)
    })
  }

  function createProductRequest() {
    return {
      type: types.CREATE_PRODUCT_REQUEST
    }
  }
  
  function createProductSuccess(product) {
    return {
      type: types.CREATE_PRODUCT_SUCCESS,
      payload: product
    }
  }
}

export function getProducts() {
  return (dispatch) => {
    dispatch(getProductsRequest())

    ProductAPI.getProducts().then(categories => {
      dispatch(getProductsSuccess(categories))
    }).catch(error => {
      console.log(error)
    })
  }

  function getProductsRequest() {
    return {
      type: types.GET_PRODUCTS_REQUEST
    }
  }
  
  function getProductsSuccess(categories) {
    return {
      type: types.GET_PRODUCTS_SUCCESS,
      payload: categories
    }
  }
}

export function getProduct(id) {
  return (dispatch) => {
    dispatch(getProductRequest())

    return new Promise(function(resolve, reject) {
      ProductAPI.getProduct(id).then(product => {        
        resolve(dispatch(getProductSuccess(product)));
      }).catch(error => {
        reject(error);
      })
    })
  }

  function getProductRequest() {
    return {
      type: types.GET_PRODUCT_REQUEST
    }
  }
  
  function getProductSuccess(product) {
    return {
      type: types.GET_PRODUCT_SUCCESS,
      payload: product
    }
  }
}

export function updateProduct(product) {
  return (dispatch) => {
    dispatch(updateProductRequest())

    ProductAPI.updateProduct(product).then(product => {
      dispatch(updateProductSuccess(product))
    }).catch(error => {
      console.log(error)
    })
  }

  function updateProductRequest() {
    return {
      type: types.UPDATE_PRODUCT_REQUEST
    }
  }
  
  function updateProductSuccess(product) {
    return {
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: product
    }
  }
}

export function deleteProduct(id) {
  return (dispatch) => {
    dispatch(deleteProductRequest())

    ProductAPI.deleteProduct(id).then(product => {
      dispatch(deleteProductSuccess(product))
    }).catch(error => {
      console.log(error)
    })
  }

  function deleteProductRequest() {
    return {
      type: types.DELETE_PRODUCT_REQUEST
    }
  }
  
  function deleteProductSuccess(product) {
    return {
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: product
    }
  }
}