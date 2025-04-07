import AuthTokenService from "@/services/auth-token.service";
import {axiosClassic, instance} from "@/api/axios";
import * as jose from 'jose'

class UserService {

  async fetchUser() {
    return await instance.post('/about-user')
  }

}

export default new UserService();
