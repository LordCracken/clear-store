import { CartData } from '../../entities/DTO';

export interface RemoveFromCartService {
  remove: (id: UniqueID, cart: CartData) => Promise<CartData>;
}

export class RemoveFromCartCase {
  removeFromCartService: RemoveFromCartService;

  constructor(service: RemoveFromCartService) {
    this.removeFromCartService = service;
  }

  async removeFromCart(id: UniqueID, cart: CartData) {
    await this.removeFromCartService.remove(id, cart);
  }
}
