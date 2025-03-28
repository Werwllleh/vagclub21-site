import {axiosCmsClassic} from "@/api/axios";

class ProductsService {

  async fetchProducts() {
    return axiosCmsClassic.get(`/products`)
  }
}

export default new ProductsService();
