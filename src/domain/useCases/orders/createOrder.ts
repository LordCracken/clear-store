import { User } from '../../entities';
import { CartData, OrderData } from '../../entities/DTO';

export interface CreateOrderService {
  create: (user: User, cart: CartData) => Promise<OrderData>;
}

export class CreateOrderCase {
  private createOrderService: CreateOrderService;

  constructor(service: CreateOrderService) {
    this.createOrderService = service;
  }

  async createOrder(user: User, cart: CartData) {
    return this.createOrderService.create(user, cart);
  }
}
