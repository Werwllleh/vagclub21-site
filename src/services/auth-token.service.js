import Cookies from 'js-cookie';
import {AuthToken} from "@/constants";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
    return accessToken || null
  }

  saveAccessToken(accessToken) {
    Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
      domain: process.env.NEXT_PUBLIC_URL_COOKIE_DOMAIN,
      sameSite: 'strict',
      expires: 1,
      maxAge: 60 * 60 * 1000,
    })
  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN)
  }
}

export default new AuthTokenService()
