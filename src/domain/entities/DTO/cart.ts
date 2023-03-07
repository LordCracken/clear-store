import { Cart, CartItem } from '../cart';

export class CartData {
  readonly products: CartItem[];
  readonly totalPrice: number;

  constructor(data: Cart) {
    this.products = data.products;
    this.totalPrice = data.totalPrice;
  }
}
