import {axiosClassic} from "@/api/axios";

class CarService {

  async fetchUsersCars() {
    return await axiosClassic.post(`/get-users-cars`)
  }

  async fetchCarInfo(carNumber) {
    return await axiosClassic.post(`/get-car-info`, {
      car_number: carNumber.toUpperCase().trim()
    })
  }

}

export default new CarService();
