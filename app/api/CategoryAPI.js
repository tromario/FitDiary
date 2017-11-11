import axios from 'axios'

export default class CategoryAPI {
  static createCategory(category) {
    return axios.post('/api/categories', {
      data: category
    }).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static getCategories() {
    return axios.get('/api/categories').then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static getCategory(id) {
    return axios.get('/api/categories/' + id).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static updateCategory(category) {
    return axios.put('/api/categories/' + category.id, {
      data: category
    }).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static deleteCategory(id) {
    return axios.delete('/api/categories/' + id).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }
}
