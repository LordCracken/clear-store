import Order from '../entities/order';
import Cart from '../entities/cart';
import generateId from '../lib/generateId';

const createOrder = (user: UniqueID, cart: Cart) => {
  const uuid = generateId();
  const id = `order-${uuid}`;

  return new Order(id, user, cart);
};

export default createOrder;
