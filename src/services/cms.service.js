import {axiosCmsClassic, instance, instanceCms} from "@/api/axios";

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

  async uploadPartnerMedia(uploadFile) {
    const file =
      uploadFile?.originFileObj instanceof File
        ? uploadFile.originFileObj
        : uploadFile;

    if (!(file instanceof File)) {
      throw new Error('Передан некорректный файл');
    }

    const formData = new FormData();

    formData.append('file', file, file.name);

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

    return response.data?.doc ?? response.data;
  }

  async deletePartnerMedia(mediaId) {
    return instanceCms.delete(`/media_partners/remove/${mediaId}`);
  }

  async attachUserCompany(data) {
    const response = await instance.post(
      '/attach-user-company',
      data,
    );

    return response.data;
  }
}

export default new CmsService();
