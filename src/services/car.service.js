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

  async fetchCarInfo(carId, carNumber) {
    return await axiosClassic.post(`/car-info`, {
      carId: !carId ? null : carId,
      carNumber: !carNumber ? null : carNumber?.toUpperCase().trim()
    })
  }

  async fetchOtherCars(count){
    return await axiosClassic.post(`/other-cars`, {
      count: !count ? null : count,
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
