import { combineReducers } from 'redux'
import product from './product'
import category from './category'
import meal from './meal'
import history from './history'

export default combineReducers({
  product,
  category,
  meal,
  history
})
