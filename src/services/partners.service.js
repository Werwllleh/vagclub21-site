import {axiosCmsClassic, instance} from "@/api/axios";

class PartnersService {

  async fetchPartners(params) {
    return instance.get(`/protect/partners`, {
      params: params
    })
  }

}

export default new PartnersService();
