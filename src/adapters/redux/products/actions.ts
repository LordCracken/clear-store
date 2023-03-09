import { Dispatch } from '@reduxjs/toolkit';
import { productsActions } from './slice';
import { ProductsService } from '../../gateways';
import { GetProductsCase } from '../../../domain/useCases';

export const fetchProductsData = () => async (dispatch: Dispatch) => {
  try {
    const service = new ProductsService();
    const useCase = new GetProductsCase(service);
    const products = await useCase.getProducts();

    dispatch(productsActions.setProducts(products));
  } catch {
    console.error('Не удалось получить список товаров.');
  }
};
