import {IProduct} from './product';

export interface CartItem extends Pick<IProduct, 'id' | 'price'> {
  quantity: number;
}

interface ICart {
  products: CartItem[];
  totalPrice: number;
}

export class Cart implements ICart {
  products: CartItem[] = [];
  totalPrice = 0;

  addProduct(id: UniqueID, price: number) {
    const existingItemIndex = this.products.findIndex(item => item.id === id);

    if (existingItemIndex) {
      this.products[existingItemIndex].price += price;
      this.products[existingItemIndex].quantity += 1;
    } else {
      this.products.concat({ id, price, quantity: 1 });
    }

    this.totalPrice += price;
  }

  removeProduct(productId: UniqueID, price: number) {
    const existingItemIndex = this.products.findIndex(item => item.id === productId);
    const existingItem = this.products.at(existingItemIndex);

    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      this.products = this.products.filter(item => item.id !== productId);
    } else {
      this.products[existingItemIndex].price -= price;
      this.products[existingItemIndex].quantity -= 1;
    }

    this.totalPrice -= price;
  }
}
