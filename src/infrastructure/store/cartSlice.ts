import { createSlice } from '@reduxjs/toolkit';
import Cart from '../../domain/entities/cart';

interface ICart extends Pick<Cart, 'products' | 'totalPrice'> {
  isOpen: boolean;
}

const initialState: ICart = {
  products: [],
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const existingItemIndex = state.products.findIndex(item => item.id === product.id);
      const existingItem = state.products[existingItemIndex];
      let updatedCart;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          price: existingItem.price + product.price,
          quantity: existingItem.quantity + 1,
        };
        updatedCart = [...state.products];
        updatedCart[existingItemIndex] = updatedItem;
      } else {
        updatedCart = state.products.concat({ id: product.id, price: product.price, quantity: 1 });
      }

      state.products = updatedCart;
      state.totalPrice += product.price;
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
