import {instance} from "@/api/axios";

class PartnersService {

  async fetchPartners(filter) {
    return instance.post(`/protect/partners`, filter)
  }

  async fetchPartnerInfo(slug) {
    return instance.post(`/protect/partner`, {
      slug: slug
    })
  }

}

export default new PartnersService();
