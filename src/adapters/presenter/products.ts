import { makeAutoObservable } from 'mobx';
import { Product } from '../../domain/entities';
import { GetProductsCase, ServerProducts } from '../../domain/useCases';
import { ProductsService } from '../gateways';
import { StoreWithStatus } from './';

class ProductsStore implements StoreWithStatus {
  products: Product[] = [];
  status?: Statuses;
  statusMsg?: string;

  constructor() {
    makeAutoObservable(this);
  }

  setStatus = (status: Statuses, statusMsg = '') => {
    this.status = status;
    this.statusMsg = statusMsg;
  };

  private setProducts = (products: Product[]) => {
    this.products = products;
  };

  fetchProductsData = async () => {
    const service = new ProductsService();
    const useCase = new GetProductsCase(service);

    try {
      this.setStatus('loading', 'Загрузка...');

      const data = await useCase.getProducts();

      const transformData = (data: ServerProducts) => {
        const products = [];

        for (const key in data) {
          products.push({ id: key, ...data[key] });
        }

        return products;
      };

      this.setProducts(transformData(data));

      this.setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось получить список товаров.');
      }
    }
  };

  getProduct(id: UniqueID) {
    return this.products.find(item => item.id === id);
  }
}

export default ProductsStore;
