import ProductsStore from './products';
import CartStore from './cart';
import UserStore from './user';

export const ProductsInstance = new ProductsStore();
export const CartInstance = new CartStore();
export const UserInstance = new UserStore(CartInstance.setIsAuthenticated);
