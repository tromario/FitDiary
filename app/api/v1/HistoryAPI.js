import axios from "axios";

const version = "/api/v1";

export default class HistoryAPI {
    static getHistories(filter) {
        var url = version + "/histories";

        if (filter) {
            url += "?q=" + JSON.stringify(filter);
        }

        var request = {
            method: "get",
            url: url
        };

        return axios(request).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}
