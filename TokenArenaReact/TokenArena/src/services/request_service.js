import {

  LOGIN,
  SIGNIN,
  API_PORT,
  REGISTER_PORTFOLIO,
  REGISTER_ARENA

} from '../constants/api'

function request(_endpoint,_options = {}) {
  console.log("requesting TO:", _endpoint)
  var req_endpoint = `${process.env.REACT_APP_API}:${process.env.REACT_APP_API_PORT}/${_endpoint}`
  console.log("fullendpoint", req_endpoint)
  return fetch(req_endpoint,{
    headers: {
      "Content-Type":"application/json"
    },
    mode: 'cors',
    ..._options,
  })
}


/**  **/

export async function get_page ( _endpoint, _data = "") {
  let options = {
    method: "GET"
  }

  return request( _endpoint, options)
          .then(resp => resp.json())
          .then(json => {
            return json
          })
}


export async function post_request (_endpoint, _payload) {
  let options = {
    method: "POST",
    body: JSON.stringify(_payload)
  }

  return request(_endpoint, options)
             .then(resp => resp.json())
             .then(json=>{
               return json
             })
}


/** Specialized Services **/

export async function register_portfolio_post (_portfolio_info){
  let options = {
    method: "POST",
    body: JSON.stringify({data: _portfolio_info})
  }

  console.log("POSTING::: ", _portfolio_info)

  return request(REGISTER_PORTFOLIO, options)
             .then( resp => resp.json())
             .then( json=>{
               console.log("REGISTERED SUCCESS::: ", json)
               return json
             })
}

export async function register_arena (_arena_info) {

    let options = {
      method: "POST",
      body: JSON.stringify({data: _arena_info})
     }

     console.log("register_arena")

     return request(REGISTER_ARENA, options)
             .then (resp => resp.json())
             .then (json => {

              return json
             })

}


export async function login_post(_user_info){
  console.log("login_post")
  let options = {
    method: "POST",
    body: JSON.stringify({data:_user_info})
  }

  var data = await request(LOGIN, options)
  var data_json = await data.json()
  return data_json
}


export async function signup_post (_user_info){
  let options = {
    method: "POST",
    body: JSON.stringify(_user_info)
  }

  return request(SIGNIN, options)
             .then( resp => resp.json())
             .then( json=>{
               return json
             })
}
