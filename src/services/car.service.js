import {axiosClassic, instance} from "@/api/axios";

class CarService {

  async fetchCarsAndModels() {
    return await axiosClassic.get(`/get-cars`)
  }

  async fetchUsersCars() {
    return await axiosClassic.post(`/get-users-cars`)
  }

  async fetchCarInfo(carNumber) {
    return await axiosClassic.post(`/get-car-info`, {
      car_number: carNumber.toUpperCase().trim()
    })
  }

  async changeCarInfo(carId, data) {
    return await instance.post(`/protect/change-car-info`, {
      carId: carId,
      data: data,
    })
  }

}

export default new CarService();
