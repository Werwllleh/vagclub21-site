import {instance} from "@/api/axios";

class UserService {

  PROTECT = '/protect';

  async fetchUser() {
    return instance.post(`${this.PROTECT}/user`)
  }

  async createUser(values) {
    return instance.post(`${this.PROTECT}/create-user`, {
      data: values
    })
  }

  async getUserCars() {
    return instance.post(`${this.PROTECT}/user-cars`)
  }

  async updateUser(values) {
    return instance.post(`${this.PROTECT}/update-user`, {
      data: values,
    })
  }

}

export default new UserService();
