import { Cart, CartItem } from '../cart';

export class CartData {
  readonly products: CartItem[] = [];

  constructor(data: Cart) {
    Array.from(data.products).map(([key, value]) => {
      this.products.push({ id: key, quantity: value });
    });
  }
}
