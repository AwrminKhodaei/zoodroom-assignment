import { SET_CITY } from '../actions/types'

const initalState = {
  city_id: 1,
  name: '',
  roomType: '',
  roomTypeName: '',
  capacity: ''

};

export default function (state = initalState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city_id: action.id,
        name: action.city,
        capacity: action.capacity,
        roomType: action.roomType,
        roomTypeName: action.roomTypeName,
      }
    default:
      return state
  }
}