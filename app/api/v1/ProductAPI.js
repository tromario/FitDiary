import axios from "axios";

const version = "/api/v1";

export default class ProductAPI {
    static createProduct(product) {
        var request = {
            method: "post",
            url: version + "/products",
            data: {
                data: product
            }
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static getProducts() {
        var request = {
            method: "get",
            url: version + "/products"
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static getProduct(id) {
        var request = {
            method: "get",
            url: version + "/products/" + id
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static updateProduct(product) {
        var request = {
            method: "put",
            url: version + "/products/" + product.id,
            data: {
                data: product
            }
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    static deleteProduct(id) {
        var request = {
            method: "delete",
            url: version + "/products/" + id
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}
