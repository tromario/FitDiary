import * as types from '../constants/Meal'
import MealAPI from '../api/v1/MealAPI'
import Promise from 'bluebird'

export function createMeal(meal) {
    return (dispatch) => {
        dispatch(createMealRequest())

        MealAPI.createMeal(meal).then(meal => {
            dispatch(createMealSuccess(meal))
        }).catch(error => {
            console.log(error)
        })
    }

    function createMealRequest() {
        return {
            type: types.CREATE_MEAL_REQUEST
        }
    }

    function createMealSuccess(meal) {
        return {
            type: types.CREATE_MEAL_SUCCESS,
            payload: meal
        }
    }
}

export function getMeals() {
    return (dispatch) => {
        dispatch(getMealsRequest())

        return MealAPI.getMeals().then(meals => {
            dispatch(getMealsSuccess(meals))
        }).catch(error => {
            console.log(error)
        })
    }

    function getMealsRequest() {
        return {
            type: types.GET_MEALS_REQUEST
        }
    }

    function getMealsSuccess(meals) {
        return {
            type: types.GET_MEALS_SUCCESS,
            payload: meals
        }
    }
}

export function getMeal(id) {
    return (dispatch) => {
        dispatch(getMealRequest())

        return new Promise(function (resolve, reject) {
            MealAPI.getMeal(id).then(meal => {
                resolve(dispatch(getMealSuccess(meal)));
            }).catch(error => {
                reject(error);
            })
        })
    }

    function getMealRequest() {
        return {
            type: types.GET_MEAL_REQUEST
        }
    }

    function getMealSuccess(meal) {
        return {
            type: types.GET_MEAL_SUCCESS,
            payload: meal
        }
    }
}

export function updateMeal(meal) {
    return (dispatch) => {
        dispatch(updateMealRequest())

        MealAPI.updateMeal(meal).then(meal => {
            dispatch(updateMealSuccess(meal))
        }).catch(error => {
            console.log(error)
        })
    }

    function updateMealRequest() {
        return {
            type: types.UPDATE_MEAL_REQUEST
        }
    }

    function updateMealSuccess(meal) {
        return {
            type: types.UPDATE_MEAL_SUCCESS,
            payload: meal
        }
    }
}

export function deleteMeal(id) {
    return (dispatch) => {
        dispatch(deleteMealRequest())

        MealAPI.deleteMeal(id).then(meal => {
            dispatch(deleteMealSuccess(meal))
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteMealRequest() {
        return {
            type: types.DELETE_MEAL_REQUEST
        }
    }

    function deleteMealSuccess(meal) {
        return {
            type: types.DELETE_MEAL_SUCCESS,
            payload: meal
        }
    }
}
