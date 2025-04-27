import {axiosClassic} from "@/api/axios";

class PartnersService {

  async fetchPartners(filter) {

    if (!filter) {
      return axiosClassic.post(`/partners`)
    } else {
      return axiosClassic.post(`/partners`, {
        label: filter.label,
        categories: filter.categories,
      })
    }

  }

  async fetchPartnersCategories() {
    return axiosClassic.get(`/get-partners-categories`)
  }

  async fetchPartnerInfo(slug) {
    return axiosClassic.post(`/partner`, {
      slug: slug
    })
  }

}

export default new PartnersService();
