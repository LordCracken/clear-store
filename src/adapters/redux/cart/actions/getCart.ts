import { Dispatch } from '@reduxjs/toolkit';
import { GetCartCase } from '../../../../domain/useCases';
import { CartService } from '../../../gateways/cart';
import { cartActions } from '../slice';

export const getCart = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const service = new CartService();
  const useCase = new GetCartCase(service);
  const products = getState().products;

  try {
    const cart = await useCase.getCart();

    const totalPrice = cart.products.reduce((totalPrice, item) => {
      const product = products.find(product => product.id === item.id);

      if (!product) return totalPrice;
      return totalPrice + item.quantity * product.price;
    }, 0);

    dispatch(cartActions.setCart({ products: cart.products, totalPrice }));
  } catch {
    console.error('Не удалось загрузить корзину');
  }
};
