import {axiosClassic} from "@/api/axios";


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
