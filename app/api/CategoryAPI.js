import axios from 'axios'

// todo: добавить версию API
export default class CategoryAPI {
  static createCategory(category) {
    var request = {
      method: 'post',
      url: '/api/categories',
      data: {
        data: category
      }
    }

    return axios(request).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static getCategories() {
    var request = {
      method: 'get',
      url: '/api/categories'
    }

    return axios(request).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static getCategory(id) {
    var request = {
      method: 'get',
      url: '/api/categories/' + id
    }

    return axios(request).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static updateCategory(category) {
    var request = {
      method: 'put',
      url: '/api/categories/' + category.id,
      data: {
        data: category
      }
    }

    return axios(request).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static deleteCategory(id) {
    var request = {
      method: 'delete',
      url: '/api/categories/' + id
    }

    return axios(request).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }
}
