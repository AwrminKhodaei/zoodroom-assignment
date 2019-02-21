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

export const roomsServices = {
  getAllRooms,
  getRoom
};
