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
    removeProduct(state, action) {
      const productId = action.payload;
      const existingItemIndex = state.products.findIndex(item => item.id === productId);
      const existingItem = state.products.at(existingItemIndex);

      if (!existingItem) return;

      let updatedCart;
      const productPrice = existingItem.price / existingItem.quantity;

      if (existingItem.quantity === 1) {
        updatedCart = state.products.filter(item => item.id !== productId);
      } else {
        const updatedItem = {
          ...existingItem,
          price: existingItem.price - productPrice,
          quantity: existingItem.quantity - 1,
        };
        updatedCart = [...state.products];
        updatedCart[existingItemIndex] = updatedItem;
      }

      state.totalPrice -= productPrice;
      state.products = updatedCart;
    },
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

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
