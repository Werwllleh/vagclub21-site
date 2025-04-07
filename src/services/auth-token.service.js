import Cookies from 'js-cookie';
import {AuthToken} from "@/constants";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);

    return accessToken || null
  }

  saveAccessToken(token) {
    Cookies.set(AuthToken.ACCESS_TOKEN, token, {
      httpOnly: false,
      domain: ".vagclub21.ru",
      sameSite: 'strict',
      secure: true,
      expires: 60 * 60 * 1000,
    })
  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN)
  }
}

export default new AuthTokenService()
