import { configureStore } from '@reduxjs/toolkit';

import products from './products/slice';
import user from './user/slice';
import cart from './cart/slice';

const store = configureStore({
  reducer: {
    products,
    user,
    cart,
  },
});

export default store;
