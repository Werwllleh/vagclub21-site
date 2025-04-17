import {errorCatch, getContentType} from "@/api/api.helper";
import {API_URL, API_CMS_URL} from "@/constants";
import axios from "axios";
import AuthTokenService from "@/services/auth-token.service";
import authService from "@/services/auth.service";
import authTokenService from "@/services/auth-token.service";


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

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
  const accessToken = AuthTokenService.getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  (config) => config,
  async (error) => {

    console.log(error)

    const originalRequest = error.config;

    if (
      (error.status === 401 ||
        error.status === 403 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewTokens();
        return instance.request(originalRequest);
      } catch (refreshError) {

        if (
          errorCatch(refreshError) === 'jwt expired' ||
          errorCatch(refreshError) === 'Refresh token not passed'
        ) {
          authTokenService.removeAccessToken();
        }
      }
    }

    throw error;
  }
);
