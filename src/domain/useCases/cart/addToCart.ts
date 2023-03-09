export interface AddToCartService {
  add: (id: UniqueID) => Promise<void>;
}

export class AddToCartCase {
  addToCartService: AddToCartService;

  constructor(service: AddToCartService) {
    this.addToCartService = service;
  }

  async addToCart(id: UniqueID) {
    await this.addToCartService.add(id);
  }
}
