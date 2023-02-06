import AppData from './appData';
import Order from '../entities/order';

const addNewOrder = (path: AppData, newOrder: Order) => {
  path.orders.concat(newOrder);
};

export default addNewOrder;
