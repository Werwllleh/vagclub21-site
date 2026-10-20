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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) throw error;

    const statusCode = error?.response?.status || error?.status;
    const errorMessage = errorCatch(error);

    if (
      (statusCode === 401 ||
        errorMessage === 'jwt expired' ||
        errorMessage === 'missing token' ||
        errorMessage === 'jwt must be provided') &&
      !originalRequest._isRetry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => instance.request(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      try {
        await authService.getNewTokens();
        processQueue(null);
        return instance.request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        authTokenService.clearSession();
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);
