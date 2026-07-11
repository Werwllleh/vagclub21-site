import {axiosCmsClassic, instanceCms} from "@/api/axios";

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

  async fetchPolicy() {
    return axiosCmsClassic.get(`/globals/policy`)
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

  async fetchPartnerInfo(slug) {
    return axiosCmsClassic.get(`/partner/c/${slug}`)
  }

  async fetchPartnerCategories() {
    return axiosCmsClassic.get(`/partner_category/c`)
  }

  async fetchPartnersLabels() {
    return axiosCmsClassic.get(`/partner/labels`)
  }

  async uploadPartnerMedia(file) {
    const formData = new FormData();

    formData.append('file', file);

    formData.append(
      '_payload',
      JSON.stringify({
        alt: file.name,
      }),
    );

    const response = await instanceCms.post(
      '/media_partners',
      formData,
    );

    return response.data;
  }

  async createPartner(data) {
    const response = await instanceCms.post(
      '/partner',
      data,
    );

    return response.data;
  }
}

export default new CmsService();
