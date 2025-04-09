import Cookies from 'js-cookie';
import {AuthToken} from "@/constants";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);

    return accessToken || null
  }

  saveAccessToken(token) {
    if (token.accessToken) {
      Cookies.set(AuthToken.ACCESS_TOKEN, token.accessToken, {
        httpOnly: false,
        domain: ".vagclub21.ru",
        sameSite: 'strict',
        secure: true,
        expires: 60 * 60 * 1000,
      })
    }

    if (token.refreshToken) {
      Cookies.set(AuthToken.REFRESH_TOKEN, token.refreshToken, {
        httpOnly: true,
        domain: ".vagclub21.ru",
        sameSite: 'strict',
        secure: true,
        expires: 60 * 60 * 1000,
      })
    }

  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN)
    Cookies.remove(AuthToken.REFRESH_TOKEN)
  }
}

export default new AuthTokenService()
