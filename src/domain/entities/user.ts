import { CartData, OrderData } from './DTO';

export class User {
  readonly firstName: string;
  readonly lastName: string;
  readonly cart: CartData;
  readonly orders: OrderData[];

  constructor(firstName: string, lastName: string, cart: CartData, orders: OrderData[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cart = cart;
    this.orders = orders;
  }
}
