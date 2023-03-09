import { Service } from './';
import { GetProductsService } from '../../domain/useCases';

export class ProductsService extends Service implements GetProductsService {
  private readonly url: string;

  constructor() {
    super();
    this.url = `${this.baseUrl}/products.json`;
  }

  async getProducts() {
    const response = await fetch(this.url);
    return await response.json();
  }
}
