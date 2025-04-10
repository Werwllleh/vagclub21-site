import {axiosClassic} from "@/api/axios";
import AuthTokenService from "@/services/auth-token.service";


class AuthService {

  async login(data) {
    const response = await axiosClassic.post('/auth/login', { data });

    if (!response.data.tokens) return;

    AuthTokenService.saveAccessToken(JSON.parse(response.data.tokens));

    return response;

  }

  async getNewTokens() {

    const refreshToken = AuthTokenService.getRefreshToken();

    if (!refreshToken) return;

    const response = await axiosClassic.post(
      '/auth/refresh-token',
      {
        refreshToken: refreshToken
      }
    )

    if (!response.data.tokens) return;

    AuthTokenService.removeAuthTokens();

    AuthTokenService.saveAccessToken(JSON.parse(response.data.tokens));

    return response;

  }
}

export default new AuthService();
