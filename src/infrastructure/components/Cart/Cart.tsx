import { useSelector } from 'react-redux';

import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import CartItem from './CartItem';
import { RootState, useAppDispatch } from '../../store';
import { cartActions } from '../../store/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice } = useSelector((state: RootState) => state.cart);
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  const closeCart = () => {
    dispatch(cartActions.closeCart());
  };

  const createOrderHandler = () => {
    dispatch(cartActions.empty());
  };

  const hasOrder = (
    <>
      {products.map(item => (
        <CartItem key={item.id} {...item} />
      ))}
      <Divider />
      <ListItem>
        <Typography sx={{ fontWeight: 700 }}>Общая стоимость: {totalPrice} рублей.</Typography>
      </ListItem>
      <ListItem sx={{ justifyContent: 'center' }}>
        <Button variant="outlined" onClick={createOrderHandler}>
          Оформить заказ
        </Button>
      </ListItem>
    </>
  );

  const hasNoOrder = <ListItem>Корзина пуста!</ListItem>;

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <List sx={{ width: '400px' }}>
        <ListItem>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={'Корзина'} />
        </ListItem>
        <Divider />
        {!products.length ? hasNoOrder : hasOrder}
      </List>
    </Drawer>
  );
};

export default Cart;
