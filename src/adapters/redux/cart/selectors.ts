import { RootState } from '../index';

export const selectCartProducts = (state: RootState) => state.cart.products;

export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
