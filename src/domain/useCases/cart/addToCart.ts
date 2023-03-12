import { CartData } from '../../entities/DTO';
import { CartItem } from '../../entities';

export interface AddToCartService {
  add: (id: UniqueID, products: CartItem[]) => Promise<CartData>;
}

export class AddToCartCase {
  addToCartService: AddToCartService;

  constructor(service: AddToCartService) {
    this.addToCartService = service;
  }

  async addToCart(id: UniqueID, products: CartItem[]) {
    return this.addToCartService.add(id, products);
  }
}
