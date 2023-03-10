import { createSlice } from '@reduxjs/toolkit';
import { CartData } from '../../../domain/entities/DTO';

interface ICart extends CartData {
  totalPrice: number;
  isOpen: boolean;
}

const initialState: ICart = {
  products: [],
  totalPrice: 0,
  isOpen: false,
};

const Slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },
    reset: () => initialState,
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const cartActions = Slice.actions;
export default Slice.reducer;
