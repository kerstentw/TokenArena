import { LOGIN,
         SIGNUP,
         REST_ERROR,
         LOGIN_REQUEST,
         LOGOUT
       } from './actionTypes'

import {
  GET_USER
} from '../constants/api'

import { req_services } from '../services'



export function login(_user_info){
    return async (dispatch, getState, login_post = login_post) => {
      dispatch({type: LOGIN_REQUEST})
      console.log("REQ")
      try {
        const { data } = await req_services.login_post(_user_info)
        console.log("login Data::: ",data)
        return dispatch(
           {
             type: LOGIN,
             payload: data
           }
        )
      } catch (err) {
        console.log(err)
        return dispatch(
          {type: REST_ERROR,
           payload: "Internal Server had a Problem.  Try again Later"}
        )
    }
  }
}


export function signup(_user_info){

    return async (dispatch, getState) => {

      try {
        const  data  = await req_services.login_post(_user_info)

        return dispatch(
           {
             type: SIGNUP,
             payload: data.id
           }
        )
      } catch(err) {
        return dispatch(
          {type: REST_ERROR,
           payload: "Internal Server had a Problem.  Try again Later"}
        )
    }
  }
}

export async function get_user(_user_id){
    return await req_services.post_request(GET_USER,{data: _user_id})
}

export function logout(){
  return async (dispatch,getState) => {
    console.log("LOGOUT INNER")

    try {

      return dispatch(
        {
           type:LOGOUT,
           payload: {}
        }
      )
    } catch (err) {
      console.log("LOGOUT-ERR ", err)
    }
  }
}
