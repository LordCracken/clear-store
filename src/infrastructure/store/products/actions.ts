import { Dispatch } from '@reduxjs/toolkit';
import getProducts from '../../../adapters/getProducts';
import data from '../../data';
import { productsActions } from './slice';

export const fetchProductsData = () => async (dispatch: Dispatch) => {
  //  fetching data
  const products = await new Promise(resolve => {
    resolve(getProducts(data));
  });

  //  check data

  dispatch(productsActions.setProducts(products));
};
