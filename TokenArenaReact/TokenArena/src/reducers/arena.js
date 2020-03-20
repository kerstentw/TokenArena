import { REGISTER_ARENA, GET_ARENAS } from '../actions/actionTypes'

var initial_state = {}

export default function arena(state = initial_state, action) {
    switch (action.type){
      case REGISTER_ARENA:
          return state
      case GET_ARENAS:
          return Object.assign({},state, action.payload)
      default:
          return state
    }
}
