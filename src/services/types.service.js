import * as axios from "axios";
import { appConstants } from "../constants/app_constants";

const getAllTypes = () => {
  return axios({
    method: 'get',
    url: appConstants.BASE_URL + '/types'
  })
}


export const typesServices = {
  getAllTypes
};
