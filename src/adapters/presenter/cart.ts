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
import { StoreWithStatus } from './';

class CartStore implements StoreWithStatus {
  isOpen = false;
  cartProducts: CartItem[] = [];
  totalPrice = 0;
  getIsAuth: () => boolean;
  status?: Statuses;
  statusMsg?: string;

  constructor(getIsAuth: () => boolean) {
    makeAutoObservable(this);
    this.getIsAuth = getIsAuth;
  }

  setStatus = (status: Statuses, statusMsg = '') => {
    this.status = status;
    this.statusMsg = statusMsg;
  };

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
      this.setStatus('loading', 'Загрузка...');

      let cart: CartData;

      if (this.getIsAuth()) {
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

      this.setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось загрузить корзину');
      }
    }
  };

  addItem = async (id: UniqueID, price: number) => {
    const service = new CartService();
    const useCase = new AddToCartCase(service);

    try {
      this.setStatus('loading', 'Загрузка...');

      const cart = await useCase.addToCart(id, this.cartProducts);
      this.setCartData(cart.products, this.totalPrice + price);
      sessionStorage.setItem('cart', JSON.stringify(cart));

      this.setStatus('success', 'Товар добавлен!');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось добавить товар в корзину');
      }
    }
  };

  removeItem = async (id: UniqueID, price: number) => {
    const service = new CartService();
    const useCase = new RemoveFromCartCase(service);

    try {
      this.setStatus('loading', 'Загрузка...');

      const cart = await useCase.removeFromCart(id, this.cartProducts);
      this.setCartData(cart.products, this.totalPrice - price);
      sessionStorage.setItem('cart', JSON.stringify(cart));

      this.setStatus('success', 'Товар удалён!');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось удалить товар из корзины');
      }
    }
  };

  reset = async () => {
    const service = new CartService();
    const useCase = new EmptyCartCase(service);

    try {
      this.setStatus('loading', 'Загрузка...');

      await useCase.emptyCart();
      this.setCartData([], 0);
      this.setIsOpen(false);

      this.setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось очистить корзину');
      }
    }
  };
}

export default CartStore;
