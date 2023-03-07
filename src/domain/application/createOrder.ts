import { Cart, Order, User } from '../entities';

export type CreateOrderService = (user: User, cart: Cart) => Promise<Order>;

export class createOrder {
  service: CreateOrderService;

  constructor(service: CreateOrderService) {
    this.service = service;
  }

  async createOrder(user: User, cart: Cart) {
    return this.service(user, cart);
  }
}
