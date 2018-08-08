import axios from "axios";

const version = "/api/v1";

export default class CategoryAPI {
    static createCategory(category) {
        var request = {
            method: "post",
            url: version + "/categories",
            data: {
                data: category
            }
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static getCategories() {
        var request = {
            method: "get",
            url: version + "/categories"
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static getCategory(id) {
        var request = {
            method: "get",
            url: version + "/categories/" + id
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static updateCategory(category) {
        var request = {
            method: "put",
            url: version + "/categories/" + category.id,
            data: {
                data: category
            }
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        })
    }

    static deleteCategory(id) {
        var request = {
            method: "delete",
            url: version + "/categories/" + id
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        })
    }
}
