import Product from './product';

export interface CartItem extends Pick<Product, 'id' | 'price'> {
  quantity: number;
}

interface Cart {
  products: CartItem[];
  totalPrice: number;
}

export default Cart;
