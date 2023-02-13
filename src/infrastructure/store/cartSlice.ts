import { createSlice } from '@reduxjs/toolkit';
import Cart from '../../domain/entities/cart';

interface ICart extends Pick<Cart, 'products' | 'totalPrice'> {
  isOpen: boolean;
}

const initialState: ICart = {
  products: [],
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart(state, action) {
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
      state = { ...action.payload, isOpen: state.isOpen };
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
