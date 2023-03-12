import { Dispatch } from '@reduxjs/toolkit';
import { Cart } from '../../../../domain/entities';
import { CartData } from '../../../../domain/entities/DTO';
import { GetCartCase } from '../../../../domain/useCases';
import { CartService } from '../../../gateways/cart';
import { cartActions } from '../slice';

export const getCart = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state = getState();
  const products = state.products;
  const isAuth = state.user.isAuthenticated;

  const service = new CartService();
  const useCase = new GetCartCase(service);

  try {
    let cart: CartData;

    if (isAuth) {
      cart = await useCase.getCart();
    } else {
      const storedCart = sessionStorage.getItem('cart');
      const newCart = new Cart([]);
      cart = storedCart ? JSON.parse(storedCart) : new CartData(newCart);
    }

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
