import {IProduct} from './product';

export interface CartItem extends Pick<IProduct, 'id' | 'price'> {
  quantity: number;
}

interface ICart {
  products: CartItem[];
  totalPrice: number;
}

export class Cart implements ICart {
  products = [];
  totalPrice = 0;
}

export default Cart;
