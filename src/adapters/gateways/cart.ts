import { AuthService } from './';
import { Cart } from '../../domain/entities';
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
  private readonly url = `${this.baseUrl}/${this.uid}/cart.json`;

  constructor() {
    super();
  }

  async get() {
    const response = await fetch(this.url);
    return response.json();
  }

  async add(id: UniqueID, cartData: CartData) {
    const cart = new Cart(cartData.products);
    cart.addProduct(id);

    const response = await fetch(this.url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new CartData(cart)),
    });

    return response.json();
  }

  async remove(id: UniqueID, cartData: CartData) {
    const cart = new Cart(cartData.products);
    cart.removeProduct(id);

    const response = await fetch(this.url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new CartData(cart)),
    });

    return response.json();
  }

  async empty() {
    await fetch(this.url, { method: 'DELETE' });
  }
}
