import {axiosCmsClassic} from "@/api/axios";

class ProductsService {

  async fetchProducts() {
    return axiosCmsClassic.get(`/products/list`)
  }

  async fetchProduct(slug) {
    return axiosCmsClassic.get(`/products/i/${slug}`)
  }

  async fetchProductsTypes(type) {
    return axiosCmsClassic.get(`/products/${type}`)
  }
}

export default new ProductsService();
