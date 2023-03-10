import { CartData } from '../../entities/DTO';

export interface GetCartService {
  get: () => Promise<CartData>;
}

export class GetCartCase {
  getCartService: GetCartService;

  constructor(service: GetCartService) {
    this.getCartService = service;
  }

  async getCart() {
    return this.getCartService.get();
  }
}
