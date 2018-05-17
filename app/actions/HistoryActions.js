import * as types from '../constants/History'
import HistoriAPI from '../api/v1/HistoryAPI'
import Promise from 'bluebird'

export function getHistories(filter) {
    return (dispatch) => {
        dispatch(getHistoriesRequest())

        return HistoriAPI.getHistories(filter).then(histories => {
            dispatch(getHistoriesSuccess(histories))
        }).catch(error => {
            console.log(error)
        })
    }

    function getHistoriesRequest() {
        return {
            type: types.GET_HISTORIES_REQUEST
        }
    }

    function getHistoriesSuccess(histories) {
        return {
            type: types.GET_HISTORIES_SUCCESS,
            payload: histories
        }
    }
}