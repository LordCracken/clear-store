export interface RemoveFromCartService {
  remove: (id: UniqueID) => Promise<void>;
}

export class RemoveFromCartCase {
  removeFromCartService: RemoveFromCartService;

  constructor(service: RemoveFromCartService) {
    this.removeFromCartService = service;
  }

  async removeFromCart(id: UniqueID) {
    await this.removeFromCartService.remove(id);
  }
}
