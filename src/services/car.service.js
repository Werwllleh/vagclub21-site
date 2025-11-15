import {axiosClassic, instance} from "@/api/axios";

class CarService {

  async getRegisterCars() {
    return await axiosClassic.get(`/register-cars`)
  }

  async addCar(data) {
    return await instance.post(`/add-car`, data)
  }

  async fetchUsersCars(number) {
    return await axiosClassic.get(`/cars`, {
      params: {
        number: number
      }
    })
  }

  async fetchCarInfo(carNumber) {
    return await axiosClassic.post(`/get-car-info`, {
      car_number: carNumber.toUpperCase().trim()
    })
  }

  async updateUserCar(carId, data) {
    return await instance.post(`/update-car`, {
      carId: carId,
      data: data,
    })
  }

  async deleteUserCar(carId) {
    return await instance.post(`/delete-car`, {
      carId: carId,
    })
  }

  //Old
  async changeCarInfo(carId, data) {
    return await instance.post(`/protect/change-car-info`, {
      carId: carId,
      data: data,
    })
  }

}

export default new CarService();
