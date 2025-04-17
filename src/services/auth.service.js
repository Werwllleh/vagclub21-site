import {axiosClassic} from "@/api/axios";
import AuthTokenService from "@/services/auth-token.service";


class AuthService {

  async login(data) {
    const response = await axiosClassic.post('/auth/login', { data });

    if (response.data.accessToken) {
      AuthTokenService.saveAccessToken(response.data.accessToken)
    }

    return response;

  }

  async getNewTokens() {

    return await axiosClassic.post(
      '/auth/refresh-token',
    )

  }

  async logout() {
    const response = await axiosClassic.post('/auth/logout')

    if (response.data) AuthTokenService.removeAccessToken()

    return response
  }
}

export default new AuthService();
