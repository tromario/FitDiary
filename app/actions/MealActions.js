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