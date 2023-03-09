import { Product } from '../../entities';

export interface GetProductsService {
  getProducts: () => Promise<Product[]>;
}

export class GetProductsCase {
  getProductsService: GetProductsService;

  constructor(service: GetProductsService) {
    this.getProductsService = service;
  }

  async getProducts() {
    return this.getProductsService.getProducts();
  }
}
