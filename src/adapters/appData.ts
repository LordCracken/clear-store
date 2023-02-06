import Order from '../domain/entities/order';
import User from '../domain/entities/user';
import Product from '../domain/entities/product';

interface AppData {
  orders: Order[];
  users: User[];
  products: Product[];
}

export default AppData;
