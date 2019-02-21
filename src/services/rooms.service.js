import * as axios from "axios";
import { appConstants } from "../constants/app_constants";

const getAllRooms = () => {
  return axios({
    method: 'get',
    url: appConstants.BASE_URL + '/rooms'
  })
}

const getRoom = (code) => {
  return axios({
    method: 'get',
    url: appConstants.BASE_URL + `/rooms/${code}`
  })
}
const getRoomByQuery = (type, capacity, city) => {
  return axios({
    method: 'get',
    url: appConstants.BASE_URL + `/rooms?type=${type}&capacity=${capacity}&city=${city}`
  })
}
export const roomsServices = {
  getAllRooms,
  getRoom,
  getRoomByQuery
};
