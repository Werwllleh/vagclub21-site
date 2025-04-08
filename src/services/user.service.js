import {instance} from "@/api/axios";

class UserService {

  PROTECT = '/protect';

  async fetchUser() {
    return await instance.post(`${this.PROTECT}/user`)
  }

}

export default new UserService();
