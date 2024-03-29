import { CartData } from './DTO';

export enum OrderStatuses {
  New,
  Completed,
}

export class Order {
  readonly user: UniqueID;
  readonly cart: CartData;
  readonly startTime: DateTime;
  completeTime: DateTime = '';
  status: OrderStatuses = OrderStatuses.New;
  private dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  constructor(user: UniqueID, cart: CartData) {
    this.user = user;
    this.cart = cart;

    const date = new Date();
    this.startTime = date.toLocaleString('ru', this.dateOptions);
  }

  finishOrder() {
    this.status = OrderStatuses.Completed;

    const date = new Date();
    this.completeTime = date.toLocaleString('ru', this.dateOptions);
  }
}
