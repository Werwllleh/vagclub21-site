import {axiosClassic, instance} from "@/api/axios";
import authTokenService from "@/services/auth-token.service";


class AuthService {

  async login(data) {
    try {
      console.log('Sending data to server:', data);

      const response = await axiosClassic.post('/auth/login', { data });

      console.log('Server response:', response.data);

      return response;
    } catch (error) {
      console.error('Error during login request:', error);
      throw error; // Пробрасываем ошибку, чтобы её можно было обработать выше
    }
  }

  async getNewTokens() {
    const response = await axiosClassic.post(
      '/auth/access-token'
    )

    if (response.data.accessToken)
      authTokenService.saveAccessToken(response.data.accessToken)

    return response
  }
}

export default new AuthService();
