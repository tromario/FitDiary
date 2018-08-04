import * as types from '../constants/History'

const initialState = {
    histories: [],
    history: null
}

export default function history(state = initialState, action) {
    switch (action.type) {
        case types.GET_HISTORIES_SUCCESS:
            return { ...state, histories: action.payload }

        default:
            return state
    }
}
