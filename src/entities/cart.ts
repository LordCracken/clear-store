interface CartItem {
  productId: UniqueID;
  quantity: number;
}

class Cart {
  products: CartItem[] = [];

  addProduct(productId: UniqueID) {
    const existingItemIndex = this.products.findIndex(item => item.productId === productId);
    const existingItem = this.products.at(existingItemIndex);
    let updatedCart;

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      updatedCart = [...this.products];
      updatedCart[existingItemIndex] = updatedItem;
    } else {
      updatedCart = this.products.concat({ productId, quantity: 1 });
    }

    return updatedCart;
  }

  removeProduct(productId: UniqueID) {
    const existingItemIndex = this.products.findIndex(item => item.productId === productId);
    const existingItem = this.products.at(existingItemIndex);
    let updatedCart;

    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      updatedCart = this.products.filter(item => item.productId !== productId);
    } else {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedCart = [...this.products];
      updatedCart[existingItemIndex] = updatedItem;
    }

    return updatedCart;
  }
}

export default Cart;
