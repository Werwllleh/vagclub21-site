import Cookies from 'js-cookie';

export const TOKEN = 'token';

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(TOKEN)
    return accessToken || null
  }

  saveAccessToken(token) {
    Cookies.set(TOKEN, token, {
      domain: process.env.DOMAIN,
      sameSite: 'strict',
      expires: 1
    })
  }

  removeAccessToken() {
    Cookies.remove(TOKEN)
  }
}

export default new AuthTokenService()
