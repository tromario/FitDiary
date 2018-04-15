import axios from 'axios'

const version = '/api/v1'

export default class MealAPI {
    static getMeals() {
        var request = {
            method: 'get',
            url: version + '/meals'
        }

        return axios(request).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    }
}
