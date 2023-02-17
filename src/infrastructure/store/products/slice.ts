import { createSlice } from '@reduxjs/toolkit';
import Product from '../../../domain/entities/product';

interface Slice {
  products: Product[];
}

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] } as Slice,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
