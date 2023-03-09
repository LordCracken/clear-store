import { CartData } from '../../entities/DTO';

export interface AddToCartService {
  add: (id: UniqueID, cart: CartData) => Promise<CartData>;
}

export class AddToCartCase {
  addToCartService: AddToCartService;

  constructor(service: AddToCartService) {
    this.addToCartService = service;
  }

  async addToCart(id: UniqueID, cart: CartData) {
    await this.addToCartService.add(id, cart);
  }
}
