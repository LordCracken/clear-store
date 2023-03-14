import { makeAutoObservable } from 'mobx';

import { Cart, CartItem, Product } from '../../domain/entities';
import { CartData } from '../../domain/entities/DTO';
import {
  AddToCartCase,
  EmptyCartCase,
  GetCartCase,
  RemoveFromCartCase,
} from '../../domain/useCases';

import { CartService } from '../gateways/cart';

class CartStore {
  isAuthenticated = false;
  isOpen = false;
  cartProducts: CartItem[] = [];
  totalPrice = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  private setCartData = (cartProducts: CartItem[], totalPrice: number) => {
    this.cartProducts = cartProducts;
    this.totalPrice = totalPrice;
  };

  setIsOpen = (value: boolean) => {
    this.isOpen = value;
  };

  getCart = async (products: Product[]) => {
    const service = new CartService();
    const useCase = new GetCartCase(service);

    try {
      let cart: CartData;

      if (this.isAuthenticated) {
        cart = await useCase.getCart();
      } else {
        const storedCart = sessionStorage.getItem('cart');
        const emptyCart = new Cart([]);
        cart = storedCart ? JSON.parse(storedCart) : new CartData(emptyCart);
      }

      const totalPrice = cart.products.reduce((totalPrice, item) => {
        const product = products.find(product => product.id === item.id);

        if (!product) return totalPrice;
        return totalPrice + item.quantity * product.price;
      }, 0);

      this.setCartData(cart.products, totalPrice);
    } catch {
      console.error('Не удалось загрузить корзину');
    }
  };

  addItem = async (id: UniqueID, price: number) => {
    const service = new CartService();
    const useCase = new AddToCartCase(service);

    try {
      const cart = await useCase.addToCart(id, this.cartProducts);
      this.setCartData(cart.products, this.totalPrice + price);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch {
      console.error('Не удалось добавить товар в корзину');
    }
  };

  removeItem = async (id: UniqueID, price: number) => {
    const service = new CartService();
    const useCase = new RemoveFromCartCase(service);

    try {
      const cart = await useCase.removeFromCart(id, this.cartProducts);
      this.setCartData(cart.products, this.totalPrice - price);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch {
      console.error('Не удалось удалить товар из корзины');
    }
  };

  reset = async () => {
    const service = new CartService();
    const useCase = new EmptyCartCase(service);

    try {
      await useCase.emptyCart();
      this.setCartData([], 0);
    } catch {
      console.error('Не удалось очистить корзину');
    }
  };
}

export default CartStore;
