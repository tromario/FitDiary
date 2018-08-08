import * as types from "../constants/Meal";

const initialState = {
    meals: [],
    meal: null
};

export default function meal(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_MEAL_SUCCESS:
            return {
                ...state,
                meals: [
                    ...state.meals,
                    action.payload
                ]
            };

        case types.GET_MEALS_SUCCESS:
            return {...state, meals: action.payload};

        case types.GET_MEAL_SUCCESS:
            return {...state, meal: action.payload};

        case types.UPDATE_MEAL_SUCCESS:
            return {
                ...state,
                meals: state.meals.map(meal => {
                    if (meal._id === action.payload._id) return action.payload;
                    return meal
                })
            };

        case types.DELETE_MEAL_SUCCESS:
            return {
                ...state,
                meals: state.meals.filter(meal => meal._id !== action.payload._id)
            };

        default:
            return state;
    }
}
