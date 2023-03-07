import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './products/slice';
import userSlice from './user/slice';
import cartSlice from './cart/slice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

export default store;
