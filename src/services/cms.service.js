import {axiosCmsClassic} from "@/api/axios";

class CmsService {

  async fetchTechnicalWorkStatus() {
    return axiosCmsClassic.get(`/globals/technical_work`)
  }

  async fetchProducts() {
    return axiosCmsClassic.get(`/products/list`)
  }

  async fetchProduct(slug) {
    return axiosCmsClassic.get(`/products/i/${slug}`)
  }

  async fetchProductsTypes(type) {
    return axiosCmsClassic.get(`/products/${type}`)
  }

  async fetchHeroSlider() {
    return axiosCmsClassic.get(`/hero_slider`)
  }

  async fetchMeeting() {
    return axiosCmsClassic.get(`/globals/meet`)
  }

  async fetchPartners(params) {
    if (params) {
      if (typeof params === "string") {
        return axiosCmsClassic.get(`/partner/c${params}`)
      } else {
        return axiosCmsClassic.get(`/partner/c`, {
          params: params
        })
      }
    } else {
      return axiosCmsClassic.get(`/partner/c`)
    }
  }

  async fetchPartnerCategories() {
    return axiosCmsClassic.get(`/partner_category/c`)
  }
}

export default new CmsService();
