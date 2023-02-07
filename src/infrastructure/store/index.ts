import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsSlice from './products-slice';
import userSlice from './user-slice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
