import UserStore from './user';
import ProductsStore from './products';
import CartStore from './cart';

export interface StoreWithStatus {
  status?: Statuses;
  statusMsg?: string;
  setStatus: (status: Statuses, statusMsg: string) => void;
}

export type Stores = UserStore | ProductsStore | CartStore;

export const UserInstance = new UserStore();
export const ProductsInstance = new ProductsStore();
export const CartInstance = new CartStore(UserInstance.getIsAuth);
