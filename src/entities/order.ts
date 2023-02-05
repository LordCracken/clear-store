import Cart from './cart';

enum OrderStatuses {
  New,
  Completed,
}

class Order {
  id: UniqueID;
  user: UniqueID;
  cart: Cart;
  status: OrderStatuses = OrderStatuses.New;

  constructor(id: UniqueID, user: UniqueID, cart: Cart) {
    this.id = id;
    this.user = user;
    this.cart = cart;
  }

  finishOrder() {
    this.status = OrderStatuses.Completed;
  }
}

export default Order;
