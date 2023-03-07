import { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products;

export const selectProductItem = (id: UniqueID) => (state: RootState) => {
  return state.products.find(item => item.id === id);
};
