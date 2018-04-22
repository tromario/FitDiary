import axios from 'axios'

const version = '/api/v1'

export default class MealAPI {
    static createMeal(meal) {
        var request = {
          method: 'post',
          url: version + '/meals',
          data: {
            data: meal
          }
        }
    
        return axios(request).then(response => {
          return response.data
        }).catch(error => {
          return error
        })
      }

    static getMeals(filter) {
        var url = version + '/meals';
        
        if (filter) {
            url += '?q=' + JSON.stringify(filter);
        }

        var request = {
            method: 'get',
            url: url
        }

        return axios(request).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }

    static getMeal(id) {
        var request = {
            method: 'get',
            url: version + '/meals/' + id
        }

        return axios(request).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }

    static updateMeal(meal) {
        var request = {
            method: 'put',
            url: version + '/meals/' + meal.id,
            data: {
                data: meal
            }
        }

        return axios(request).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }

    static deleteMeal(id) {
        var request = {
            method: 'delete',
            url: version + '/meals/' + id
        }

        return axios(request).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }
}
