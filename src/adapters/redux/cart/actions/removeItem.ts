import { Dispatch } from '@reduxjs/toolkit';
import { CartService } from '../../../gateways/cart';
import { RemoveFromCartCase } from '../../../../domain/useCases';
import { cartActions } from '../slice';

export const removeItem =
  (id: UniqueID, price: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState();
    const { products, totalPrice } = state.cart;

    const service = new CartService();
    const useCase = new RemoveFromCartCase(service);

    try {
      const cart = await useCase.removeFromCart(id, products);
      dispatch(cartActions.setCart({ products: cart.products, totalPrice: totalPrice - price }));
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch {
      console.error('Не удалось удалить товар из корзины');
    }
  };
