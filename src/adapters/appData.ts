import Order from '../entities/order';
import User from '../entities/user';
import Product from '../entities/product';

interface AppData {
  orders: Order[];
  users: User[];
  products: Product[];
}

export default AppData;
