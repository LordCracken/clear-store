import { CartData } from './cart';
import { Order, OrderStatuses } from '../order';

export class OrderData {
  readonly user: UniqueID;
  readonly cart: CartData;
  readonly startTime: DateTime;
  readonly completeTime: DateTime;
  readonly status: OrderStatuses;

  constructor(data: Order) {
    this.user = data.user;
    this.cart = data.cart;
    this.startTime = data.startTime;
    this.completeTime = data.completeTime;
    this.status = data.status;
  }
}
