import AppData from './appData';
import Order from '../domain/entities/order';

const addNewOrder = (path: AppData, newOrder: Order) => {
  path.orders.concat(newOrder);
};

export default addNewOrder;
