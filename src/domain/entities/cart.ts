type Products = Map<UniqueID, number>;

export interface CartItem {
  id: UniqueID;
  quantity: number;
}

export class Cart {
  readonly products: Products = new Map();

  constructor(products: CartItem[]) {
    if (products) {
      products.forEach(({ id, quantity }) => this.products.set(id, quantity));
    }
  }

  addProduct(id: UniqueID) {
    const quantity = this.products.get(id) ?? 0;
    this.products.set(id, quantity + 1);
  }

  removeProduct(id: UniqueID) {
    const quantity = this.products.get(id) ?? 0;

    if (quantity <= 1) {
      this.products.delete(id);
    } else {
      this.products.set(id, quantity - 1);
    }
  }
}
