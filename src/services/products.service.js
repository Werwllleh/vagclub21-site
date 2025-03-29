import {axiosCmsClassic} from "@/api/axios";

class ProductsService {

  async fetchProducts() {
    return axiosCmsClassic.get(`/products`)
  }

  async fetchProduct(slug) {
    return axiosCmsClassic.get(`/products/${slug}`)
  }

  async fetchProductsTypes() {
    return axiosCmsClassic.get(`/products-types`)
  }
}

export default new ProductsService();
