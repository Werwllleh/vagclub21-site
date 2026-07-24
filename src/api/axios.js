import {errorCatch, getContentType} from "@/api/api.helper";
import {API_URL, API_CMS_URL} from "@/constants";
import axios from "axios";
import authService from "@/services/auth.service";
import authTokenService from "@/services/auth-token.service";


const axiosOptions = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true
}

const axiosOptionsCms = {
  baseURL: API_CMS_URL,
  withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)

export const axiosCmsClassic = axios.create({
  baseURL: API_CMS_URL,
  withCredentials: true
})

export const instance = axios.create(axiosOptions)

export const instanceCms = axios.create(axiosOptionsCms)

// Токены отправляются автоматически через httpOnly-куки (withCredentials),
// заголовок Authorization больше не нужен — токен из JS недоступен.

instance.interceptors.response.use(
  (config) => config,
  async (error) => {

    // console.log(error)

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
        // refresh не удался — сессия недействительна, снимаем маркер
        authTokenService.clearSession();
      }
    }

    throw error;
  }
);
