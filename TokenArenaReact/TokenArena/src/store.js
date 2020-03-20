import { applyMiddleware, createStore, compose } from 'redux';
//import { createLogger } from 'redux-logger'
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
//import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';
import reduxThunk from "redux-thunk";
//import * as request_services from './services/request_service'

//import { login_post, register_portfolio_post } from './services/request_service'

import * as services from './services'

//import { routerMiddleware } from 'react-router-redux'
//import createHistory from 'history/createBrowserHistory';

//export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

/*
const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware( promiseMiddleware, localStorageMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware( promiseMiddleware, localStorageMiddleware, createLogger())
  }
};
*/

console.log("asd", services)

const middleware = [
	reduxThunk.withExtraArgument( services  )
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);
//, composeWithDevTools(getMiddleware())
