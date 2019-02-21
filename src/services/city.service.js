import * as axios from "axios";
import { appConstants } from "../constants/app_constants";

const getAllCities = () => {
  return axios({
    method: 'get',
    url: appConstants.BASE_URL + '/cities'
  })
}


export const cityServices = {
  getAllCities
};
