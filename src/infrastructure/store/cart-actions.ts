import { Dispatch } from '@reduxjs/toolkit';
import addProductToCart from '../../adapters/addProductToCart';

import Product from '../../domain/entities/product';

import { RootState } from './index';
import { cartActions } from './cartSlice';

type IGetState = () => RootState;

export const addProduct =
  (newProduct: Product) => async (dispatch: Dispatch, getState: IGetState) => {
    const { products, totalPrice } = getState().cart;
    //  fetching data
    const newCart = await new Promise(resolve => {
      resolve(addProductToCart(products, totalPrice, newProduct));
    });

    //  check data
    dispatch(cartActions.updateCart(newCart));
  };
