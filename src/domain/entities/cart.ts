import Product from './product';

export interface CartItem extends Pick<Product, 'id' | 'price'> {
  quantity: number;
}

class Cart {
  products: CartItem[] = [];
  totalPrice: number;

  constructor(products: CartItem[], totalPrice: number) {
    this.products = products;
    this.totalPrice = totalPrice;
  }
}

export default Cart;
