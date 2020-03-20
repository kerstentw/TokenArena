import { REGISTER_PORTFOLIO,REST_ERROR } from './actionTypes'

import { req_services } from '../services'

export function register_portfolio(_portfolio_info) {
    console.log("WOO")
    return async (dispatch, getState, register_portfolio_post = register_portfolio_post) => {

      console.log("REQ", register_portfolio_post)
      try {
        const { data } = await req_services.register_portfolio_post(_portfolio_info)
        console.log("RECV_DATUM::: ",data)
        return dispatch(
           {
             type: REGISTER_PORTFOLIO,
             payload: data.id
           }
        )
      } catch (err) {
        console.log(err)
        return dispatch(
          {
            type: REST_ERROR,
            payload: "Internal Server had a Problem.  Try again Later"
          }
        )
    }
  }
}
