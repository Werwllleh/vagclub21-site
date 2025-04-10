import {instance} from "@/api/axios";

class UserService {

  PROTECT = '/protect';

  async fetchUser() {
    return await instance.post(`${this.PROTECT}/user`)
  }

  async updateUserData(values) {
    return await instance.post(`${this.PROTECT}/update-user`, {
      data: values,
    })
  }

}

export default new UserService();
