import * as types from '../constants/Meal'

const initialState = {
    meals: [],
    meal: null
}

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.GET_MEALS_SUCCESS:
            return { ...state, meals: action.payload }

        default:
            return state
    }
}
