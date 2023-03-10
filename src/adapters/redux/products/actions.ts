import { Dispatch } from '@reduxjs/toolkit';
import { productsActions } from './slice';
import { ProductsService } from '../../gateways';
import { GetProductsCase, ServerProducts } from '../../../domain/useCases';

export const fetchProductsData = () => async (dispatch: Dispatch) => {
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

    dispatch(productsActions.setProducts(transformData(data)));
  } catch {
    console.error('Не удалось получить список товаров.');
  }
};
