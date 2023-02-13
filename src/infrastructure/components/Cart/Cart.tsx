import { useSelector } from 'react-redux';

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import CartList from './CartList';
import { RootState, useAppDispatch } from '../../store';
import { cartActions } from '../../store/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { products } = useSelector((state: RootState) => state.cart);
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  const closeCart = () => {
    dispatch(cartActions.closeCart());
  };

  const hasOrder = <CartList />;
  const hasNoOrder = <ListItem>Корзина пуста!</ListItem>;

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <List sx={{ width: {md: '400px', xs: '300px'} }}>
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
