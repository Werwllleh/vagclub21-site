import {axiosClassic} from "@/api/axios";

class PartnersService {

  async fetchPartners(filter) {
    return axiosClassic.post(`/partners`, filter)
  }

  async fetchPartnerInfo(slug) {
    return axiosClassic.post(`/partner`, {
      slug: slug
    })
  }

}

export default new PartnersService();
