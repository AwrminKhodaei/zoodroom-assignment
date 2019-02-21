import { SET_CITY } from "./types";

export const setURLParams = (data) => ({
  type: SET_CITY,
  id: Number(data.slectedCityId),
  city: data.slectedCity,
  roomType: data.roomType,
  roomTypeName: data.roomTypeName,
  capacity: data.capacity
})