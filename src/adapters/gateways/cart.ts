import { AuthService } from './';
import { Cart, CartItem } from '../../domain/entities';
import {
  AddToCartService,
  EmptyCartService,
  GetCartService,
  RemoveFromCartService,
} from '../../domain/useCases';
import { CartData } from '../../domain/entities/DTO';

export class CartService
  extends AuthService
  implements GetCartService, AddToCartService, RemoveFromCartService, EmptyCartService
{
  url: string;

  constructor() {
    super();
    this.url = `${this.usersUrl}/${this.uid}/cart.json`;
  }

  async get() {
    const response = await fetch(this.url);
    const data = await response.json();
    const cart = new Cart(data?.products ?? []);
    return new CartData(cart);
  }

  private async sendNewCart(cart: Cart) {
    if (!this.uid) {
      return new CartData(cart);
    }

    const response = await fetch(this.url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new CartData(cart)),
    });

    return response.json();
  }

  async add(id: UniqueID, products: CartItem[]) {
    const cart = new Cart(products);
    cart.addProduct(id);

    return this.sendNewCart(cart);
  }

  async remove(id: UniqueID, products: CartItem[]) {
    const cart = new Cart(products);
    cart.removeProduct(id);

    return this.sendNewCart(cart);
  }

  async empty() {
    await fetch(this.url, { method: 'DELETE' });
  }
}
