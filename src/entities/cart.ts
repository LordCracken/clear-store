import Product from './product';

interface CartItem extends Pick<Product, 'id' | 'price'> {
  quantity: number;
}

class Cart {
  products: CartItem[] = [];
  totalPrice = 0;

  addProduct(product: Product) {
    const existingItemIndex = this.products.findIndex(item => item.id === product.id);
    const existingItem = this.products.at(existingItemIndex);
    let updatedCart;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        price: existingItem.price + product.price,
        quantity: existingItem.quantity + 1,
      };
      updatedCart = [...this.products];
      updatedCart[existingItemIndex] = updatedItem;
    } else {
      updatedCart = this.products.concat({ id: product.id, price: product.price, quantity: 1 });
    }

    this.totalPrice += product.price;

    return updatedCart;
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

    return updatedCart;
  }

  empty() {
    this.products = [];
    this.totalPrice = 0;
  }
}

export default Cart;
