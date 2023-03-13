import { makeAutoObservable } from 'mobx';
import { Product } from '../../domain/entities';
import { GetProductsCase, ServerProducts } from '../../domain/useCases';
import { ProductsService } from '../gateways';

class ProductsStore {
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setProducts = (products: Product[]) => {
    this.products = products;
  };

  async fetchProductsData() {
    const service = new ProductsService();
    const useCase = new GetProductsCase(service);

    try {
      const data = await useCase.getProducts();

      const transformData = (data: ServerProducts) => {
        const products = [];

        for (const key in data) {
          products.push({ id: key, ...data[key] });
        }

        return products;
      };

      this.setProducts(transformData(data));
    } catch {
      console.error('Не удалось получить список товаров.');
    }
  }

  getProduct(id: UniqueID) {
    return this.products.find(item => item.id === id);
  }
}

export const ProductsInstance = new ProductsStore();
