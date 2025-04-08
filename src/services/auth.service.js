import {axiosClassic, instance} from "@/api/axios";
import authTokenService from "@/services/auth-token.service";


class AuthService {

  async login(data) {
    return await axiosClassic.post('/auth/login', { data });
  }

  async getNewTokens() {
    return await axiosClassic.post(
      '/auth/refresh-token'
    )
  }
}

export default new AuthService();
