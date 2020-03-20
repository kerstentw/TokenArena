import {
  LOGIN,
  SIGNUP,
  LOGOUT
} from '../actions/actionTypes'


const initial_state = {
    email: "fuckface@shitsauce.com",
    token: "dicks",
    id: "dicks_id"
}

const test_logout = {}

//const initial_state = {}

export default function user(state=initial_state, action) {
  console.log("action_type:: ", action.type)
  switch (action.type) {

    case LOGIN:
        return Object.assign({}, state, action.payload)

    case SIGNUP:
        return {
          ...state,
          inProgress: false
        };

    case LOGOUT:
        return Object.assign({}, state, {id: null, email: null, token: null})

    default:
        return state


  }

}
