import { req_services } from '../services'
import { REGISTER_ARENA, GET_ARENAS, JOIN_ARENA } from './actionTypes'
import { FETCH_ARENAS, POST_JOIN_ARENA } from '../constants/api'

export default function register_arena(_arena_info) {
    return async (dispatch, getState) => {

        const { data } = await req_services.register_arena(_arena_info)

        dispatch({
          type: REGISTER_ARENA,
          payload: data
        })
    }

}


export function fetch_all_arenas(){
  return async (dispatch, getState) => {
    const { data } = await req_services.get_page(FETCH_ARENAS)
    
    dispatch({
        type: GET_ARENAS,
        payload: data
    })
  }

}


export function join_arena(_portfolio_info){
    return async (dispatch, getState) => {
      const { data } = await req_services.post_request(POST_JOIN_ARENA, _portfolio_info)

      dispatch({
        type: JOIN_ARENA,
        payload: data
      }
     )
    }
}
