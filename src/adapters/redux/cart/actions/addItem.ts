import { Dispatch } from '@reduxjs/toolkit';
import { CartService } from '../../../gateways/cart';
import { AddToCartCase } from '../../../../domain/useCases';
import { cartActions } from '../slice';

export const addItem =
  (id: UniqueID, price: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    const service = new CartService();
    const useCase = new AddToCartCase(service);
    const { products, totalPrice } = getState().cart;

    try {
      const cart = await useCase.addToCart(id, { products });
      dispatch(cartActions.setCart({ products: cart.products, totalPrice: totalPrice + price }));
    } catch {
      console.error('Не удалось добавить товар в корзину');
    }
  };
