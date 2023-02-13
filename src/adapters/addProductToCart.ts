import { CartItem } from '../domain/entities/cart';
import Product from '../domain/entities/product';
import addProduct from '../domain/application/addProductToCart';

const addProductToCart = (
  currentProducts: CartItem[],
  currentTotalPrice: number,
  product: Product,
) => {
  const { products, totalPrice } = addProduct(currentProducts, currentTotalPrice, product);
  return { products, totalPrice };
};

export default addProductToCart;
