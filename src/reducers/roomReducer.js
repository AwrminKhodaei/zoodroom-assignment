import { SET_CITY } from '../actions/types'

const initalState = {
  city_id: 1

};

export default function (state = initalState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city_id: action.id
      }
    default:
      return state
  }
}