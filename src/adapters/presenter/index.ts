import UserStore from './user';
import ProductsStore from './products';
import CartStore from './cart';

export const UserInstance = new UserStore();
export const ProductsInstance = new ProductsStore();
export const CartInstance = new CartStore(UserInstance.getIsAuth);
