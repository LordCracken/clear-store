import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsSlice from './products-slice';
import userSlice from './user-slice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
