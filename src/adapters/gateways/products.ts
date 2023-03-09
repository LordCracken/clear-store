import { GetProductsService } from '../../domain/useCases/getProducts';

export class ProductsService implements GetProductsService {
  private url = 'https://clean-store-e7a58-default-rtdb.europe-west1.firebasedatabase.app/products';

  async getProducts() {
    const response = await fetch(this.url);
    return await response.json();
  }
}
