import { CartData } from '../../entities/DTO';
import { CartItem } from '../../entities';

export interface RemoveFromCartService {
  remove: (id: UniqueID, products: CartItem[]) => Promise<CartData>;
}

export class RemoveFromCartCase {
  private removeFromCartService: RemoveFromCartService;

  constructor(service: RemoveFromCartService) {
    this.removeFromCartService = service;
  }

  async removeFromCart(id: UniqueID, products: CartItem[]) {
    return this.removeFromCartService.remove(id, products);
  }
}
