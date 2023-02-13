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

  removeProduct(productId: UniqueID) {
    const existingItemIndex = this.products.findIndex(item => item.id === productId);
    const existingItem = this.products.at(existingItemIndex);

    if (!existingItem) return;

    let updatedCart;
    const productPrice = existingItem.price / existingItem.quantity;

    if (existingItem.quantity === 1) {
      updatedCart = this.products.filter(item => item.id !== productId);
    } else {
      const updatedItem = {
        ...existingItem,
        price: existingItem.price - productPrice,
        quantity: existingItem.quantity - 1,
      };
      updatedCart = [...this.products];
      updatedCart[existingItemIndex] = updatedItem;
    }

    this.totalPrice -= productPrice;
    this.products = updatedCart;
  }

  empty() {
    this.products = [];
    this.totalPrice = 0;
  }
}

export default Cart;
