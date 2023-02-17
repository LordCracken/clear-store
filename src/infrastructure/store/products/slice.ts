import { createSlice } from '@reduxjs/toolkit';
import Product from '../../../domain/entities/product';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
