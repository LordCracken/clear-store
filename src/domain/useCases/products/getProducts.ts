import { Product } from '../../entities';

export interface ServerProducts {
  [key: string]: Omit<Product, 'id' | 'description'>;
}

export interface GetProductsService {
  getProducts: () => Promise<ServerProducts>;
}

export class GetProductsCase {
  private getProductsService: GetProductsService;

  constructor(service: GetProductsService) {
    this.getProductsService = service;
  }

  async getProducts() {
    return this.getProductsService.getProducts();
  }
}
