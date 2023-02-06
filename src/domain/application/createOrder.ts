import Order from '../entities/order';
import Cart from '../entities/cart';
import generateId from '../lib/generateId';

const createOrder = (user: UniqueID, cart: Cart) => {
  const uuid = generateId();
  const id = `order-${uuid}`;

  const order = new Order(id, user, cart);
  cart.empty();
  return order;
};

export default createOrder;
