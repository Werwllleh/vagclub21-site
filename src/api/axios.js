import {getContentType} from "@/api/api.helper";
import {API_CMS_URL} from "@/constants";
import axios from "axios";


const axiosOptions = {
  baseURL: API_CMS_URL,
  headers: getContentType(),
  withCredentials: false
}

const axiosOptionsCms = {
  baseURL: API_CMS_URL,
  headers: getContentType(),
  withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)

export const axiosCmsClassic = axios.create(axiosOptionsCms)

export const instance = axios.create(axiosOptions)
