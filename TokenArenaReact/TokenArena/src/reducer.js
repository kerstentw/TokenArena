import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'
import user from './reducers/user'
import portfolio from './reducers/portfolio'
import arena from './reducers/arena'

export default combineReducers({
  //Put Reducers Here
  portfolio,
  user,
  arena
})
