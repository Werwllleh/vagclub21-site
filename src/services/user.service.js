import {axiosClassic, instance} from "@/api/axios";

class UserService {

  PROTECT = '/protect';

  async fetchUser() {
    return instance.post(`${this.PROTECT}/user`)
    // return instance.post(`/about-user`)
  }

  async createUser(values) {
    return instance.post(`/create-user`, {
      data: values
    })
  }

  async getUserCars({ page = 1, limit = 20, number } = {}) {
    // return instance.post(`/cars`)
    return axiosClassic.get(`/cars`, {
      params: {
        page,
        limit,
        number,
      },
    })
  }

  async updateUser(values) {
    return instance.post(`/update-user`, {
      data: values
    })
  }

}

export default new UserService();
