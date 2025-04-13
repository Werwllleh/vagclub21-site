import {getContentType} from "@/api/api.helper";
import {API_CMS_URL, API_URL} from "@/contstans";
import axios from "axios";


const axiosOptions = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true
}

const axiosOptionsCms = {
  baseURL: API_CMS_URL,
  headers: getContentType(),
  withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)

export const axiosCmsClassic = axios.create(axiosOptionsCms)
