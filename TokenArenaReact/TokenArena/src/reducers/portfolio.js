import { REGISTER_PORTFOLIO } from '../actions/actionTypes'

var initial_state = {}

export default function portfolio(state=initial_state, action) {

    switch (action.type) {
      case REGISTER_PORTFOLIO:
          return Object.assign({}, state, {id: action.payload.id})

      default:
          return state
    }

}
