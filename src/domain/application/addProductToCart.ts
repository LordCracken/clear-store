import Cart, { CartItem } from '../entities/cart';
import Product from '../entities/product';

const addProductToCart = (products: CartItem[], totalPrice: number, product: Product) => {
  const cart = new Cart(products, totalPrice);
  cart.addProduct(product);
  return cart;
};

export default addProductToCart;
