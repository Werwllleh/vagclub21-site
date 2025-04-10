// export const API_URL = `https://vagclub21.ru/api`;
export const API_URL = `http://localhost:5000/api`;
export const CMS_URL = `https://cms.vagclub21.ru`;
export const API_CMS_URL = `https://cms.vagclub21.ru/api`;

export const BACKEND_SOCIAL_AUTH_URL = `${API_URL}/auth`
export const TG_AUTH_REDIRECT_URL = `${BACKEND_SOCIAL_AUTH_URL}/telegram/redirect`

export const AuthToken = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
}
