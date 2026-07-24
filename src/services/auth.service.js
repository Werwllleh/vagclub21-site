import {axiosClassic} from "@/api/axios";
import AuthTokenService from "@/services/auth-token.service";


class AuthService {

  async login(data) {
    const response = await axiosClassic.post('/auth/login', { data });

    // Бэкенд ставит httpOnly-куки токенов; на клиенте помечаем наличие сессии
    if (response.status === 200) {
      AuthTokenService.setSession();
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

    AuthTokenService.clearSession();

    return response
  }
}

export default new AuthService();
