import Cookies from 'js-cookie';
import {AuthToken} from "@/constants";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
    return accessToken || null
  }

  saveAccessToken(token) {
    Cookies.set(AuthToken.ACCESS_TOKEN, token, {
      domain: process.env.DOMAIN,
      sameSite: 'strict',
      expires: 1
    })
  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN)
  }
}

export default new AuthTokenService()
