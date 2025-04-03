import {axiosCmsClassic} from "@/api/axios";


class MainSliderService {

  async fetchSlides() {
    return axiosCmsClassic.get(`/slides`)
  }

}

export default new MainSliderService();