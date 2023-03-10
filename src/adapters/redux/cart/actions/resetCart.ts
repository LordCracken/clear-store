import { Dispatch } from '@reduxjs/toolkit';
import { CartService } from '../../../gateways/cart';
import { EmptyCartCase } from '../../../../domain/useCases';
import { cartActions } from '../slice';

export const resetCart = () => async (dispatch: Dispatch) => {
  const service = new CartService();
  const useCase = new EmptyCartCase(service);

  try {
    await useCase.emptyCart();
    dispatch(cartActions.reset());
  } catch {
    console.error('Не удалось очистить корзину');
  }
};
