import Cart from './cart';

enum OrderStatuses {
  New,
  Completed,
}

class Order {
  id: UniqueID;
  user: UniqueID;
  cart: Cart;
  startTime: DateTime;
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

  constructor(id: UniqueID, user: UniqueID, cart: Cart) {
    this.id = id;
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

export default Order;
