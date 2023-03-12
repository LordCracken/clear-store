export const selectProducts = (state: RootState) => state.products;

export const selectProductItem = (id: UniqueID) => (state: RootState) => {
  return state.products.find(item => item.id === id);
};

export const selectIsProductsLoaded = (state: RootState) => state.products.length > 0;
