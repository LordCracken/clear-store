type Products = Map<UniqueID, number>;

interface ICart {
  readonly products: Products;
}

export interface CartItem {
  id: UniqueID;
  quantity: number;
}

export class Cart implements ICart {
  products: Products = new Map();

  constructor(products: CartItem[]) {
    products.forEach(({ id, quantity }) => this.products.set(id, quantity));
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
