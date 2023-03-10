import { Dispatch } from '@reduxjs/toolkit';
import { CartService } from '../../../gateways/cart';
import { AddToCartCase } from '../../../../domain/useCases';
import { cartActions } from '../slice';

export const addItem =
  (id: UniqueID, price: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    const service = new CartService();
    const useCase = new AddToCartCase(service);

    const state = getState();
    const { products, totalPrice } = state.cart;

    try {
      const cart = await useCase.addToCart(id, { products });
      dispatch(cartActions.setCart({ products: cart.products, totalPrice: totalPrice + price }));
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch {
      console.error('Не удалось добавить товар в корзину');
    }
  };
