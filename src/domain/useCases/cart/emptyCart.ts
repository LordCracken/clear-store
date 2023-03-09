export interface EmptyCartService {
  empty: () => Promise<void>;
}

export class EmptyCartCase {
  emptyCartService: EmptyCartService;

  constructor(service: EmptyCartService) {
    this.emptyCartService = service;
  }

  async emptyCart() {
    await this.emptyCartService.empty();
  }
}
