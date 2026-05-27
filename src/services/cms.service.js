import {axiosCmsClassic} from "@/api/axios";

class CmsService {

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
}

export default new CmsService();
