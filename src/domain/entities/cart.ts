interface ICart {
  readonly products: Map<UniqueID, number>;
}

export class Cart implements ICart {
  products = new Map<UniqueID, number>();

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

  empty() {
    this.products.clear();
  }
}
