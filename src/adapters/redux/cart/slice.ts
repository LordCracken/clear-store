import { createSlice } from '@reduxjs/toolkit';
import { CartData } from '../../../domain/entities/DTO';

interface ICart extends CartData {
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
    empty() {
      return initialState;
    },
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
